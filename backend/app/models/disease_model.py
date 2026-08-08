"""
Disease Detection Model — Gemini Vision Integration.

DiseaseClassifierModel wraps the google-genai client to perform
agricultural image analysis using gemini-3.6-flash.

Architecture:
    DiseaseClassifierModel.predict(image_bytes)
        ↓
    Gemini Client
        ↓
    gemini-3.6-flash
        ↓
    Agricultural image analysis prompt
        ↓
    Structured JSON result
"""

import os
import json
import re
import time
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables once at import time.
load_dotenv(override=True)

GEMINI_MODEL = "gemini-3.6-flash"

_PROMPT = """You are an expert agricultural crop advisory system for smallholder farmers.
Analyze the provided crop/leaf image carefully.

Return your analysis ONLY as a valid JSON object with these exact fields:
{
  "crop": "<Identified crop name, or 'Unknown'>",
  "disease": "<Likely disease or pest name, or 'Healthy', or 'Uncertain'>",
  "qualitative_confidence": "<'High', 'Medium', or 'Low'>",
  "observations": "<Detailed visual symptoms observed on the leaf or plant>",
  "advisory": "<Actionable agricultural advisory and treatment recommendations>"
}

Rules:
- Identify the crop if possible from leaf shape, venation, or stem features.
- Identify the disease or pest if visible symptoms are present.
- Use ONLY qualitative confidence ('High', 'Medium', 'Low'). Never invent a numerical percentage.
- If the image is unclear or insufficient for a definitive diagnosis, say so in observations and set qualitative_confidence to 'Low'.
- Return ONLY the JSON object. No markdown fences or extra text.
"""


def _detect_mime_type(image_bytes: bytes) -> str:
    """Detect image MIME type from magic header bytes."""
    if image_bytes.startswith(b"\x89PNG"):
        return "image/png"
    elif image_bytes.startswith(b"RIFF") and b"WEBP" in image_bytes[:16]:
        return "image/webp"
    return "image/jpeg"


class DiseaseClassifierModel:
    """
    Wraps the Gemini Vision API for crop disease and pest detection.

    Can later be swapped out for a YOLO or CNN model by replacing
    only this class — the service and route layers remain unchanged.
    """

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY is not set. "
                "Add it to backend/.env before running the server."
            )
        self.client = genai.Client(api_key=api_key)
        self.model = GEMINI_MODEL

    def predict(self, image_bytes: bytes) -> dict:
        """
        Send image bytes to Gemini and return a structured prediction dict.

        Returns:
            {
                "crop": str,
                "disease": str,
                "confidence": str | None,   # qualitative: High/Medium/Low
                "advice": str,
                "observations": str | None
            }
        """
        if not image_bytes:
            return {
                "crop": "Unknown",
                "disease": "No image provided",
                "confidence": None,
                "advice": "Please upload a clear crop or leaf image for analysis.",
                "observations": None,
            }

        mime_type = _detect_mime_type(image_bytes)
        max_attempts = 3
        last_exception = None
        raw_text = ""

        for attempt in range(1, max_attempts + 1):
            try:
                response = self.client.models.generate_content(
                    model=self.model,
                    contents=[
                        _PROMPT,
                        types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                    ],
                )
                raw_text = response.text.strip()

                # Strip any accidental markdown code fences (```json ... ```)
                cleaned = re.sub(r"^```(?:json)?\s*", "", raw_text, flags=re.IGNORECASE)
                cleaned = re.sub(r"\s*```$", "", cleaned)

                data = json.loads(cleaned)

                return {
                    "crop": data.get("crop", "Unknown"),
                    "disease": data.get("disease", "Uncertain"),
                    "confidence": data.get("qualitative_confidence"),
                    "advice": data.get("advisory", "No advisory available."),
                    "observations": data.get("observations"),
                }

            except json.JSONDecodeError:
                # Gemini returned non-JSON — surface raw text as advisory
                return {
                    "crop": "Unknown",
                    "disease": "Uncertain",
                    "confidence": "Low",
                    "advice": raw_text if raw_text else "Unable to parse model response.",
                    "observations": None,
                }
            except Exception as exc:
                last_exception = exc
                import traceback
                print(f"[DEBUG] DiseaseClassifierModel (Attempt {attempt}/{max_attempts}) Exception caught: {type(exc).__name__}: {str(exc)}")
                if attempt < max_attempts:
                    time.sleep(1.0)
                else:
                    traceback.print_exc()

        return {
            "crop": "Unknown",
            "disease": "Analysis failed",
            "confidence": None,
            "advice": f"Disease analysis encountered an error: {type(last_exception).__name__}: {str(last_exception)}",
            "observations": None,
        }


