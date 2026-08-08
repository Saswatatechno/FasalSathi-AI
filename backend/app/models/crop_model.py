import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()


class CropRecommenderModel:

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_name = "gemini-3.6-flash"
        self.is_loaded = bool(self.api_key)

    def load_model(self):
        """Check that Gemini API configuration is available."""
        self.is_loaded = bool(self.api_key)

    def predict(self, features: dict) -> dict:
        """
        Get crop recommendation from Gemini based on
        soil and environmental conditions.
        """

        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is not configured.")

        prompt = f"""
You are an agricultural crop recommendation assistant.

Recommend the most suitable crop based ONLY on the following
soil and environmental conditions:

Nitrogen (N): {features["nitrogen"]} mg/kg
Phosphorus (P): {features["phosphorus"]} mg/kg
Potassium (K): {features["potassium"]} mg/kg
Temperature: {features["temperature"]} °C
Humidity: {features["humidity"]} %
Soil pH: {features["ph"]} 
Rainfall: {features["rainfall"]} mm

Choose one suitable common agricultural crop.

Return ONLY valid JSON in exactly this format:

{{
    "recommended_crop": "crop name",
    "reason": "short explanation"
}}

Do not return confidence scores.
Do not include markdown.
"""

        url = (
            f"https://generativelanguage.googleapis.com/"
            f"v1beta/models/{self.model_name}:generateContent"
        )

        headers = {
            "x-goog-api-key": self.api_key,
            "Content-Type": "application/json",
        }

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "responseMimeType": "application/json"
            },
        }

        try:
            response = requests.post(
                url,
                json=payload,
                headers=headers,
                timeout=30,
            )

            # IMPORTANT: show the real Gemini error
            if not response.ok:
                print("===== GEMINI API ERROR =====")
                print("Status:", response.status_code)
                print("Response:", response.text)
                print("============================")

                raise RuntimeError(
                    f"Gemini API error {response.status_code}: "
                    f"{response.text}"
                )

            data = response.json()

            text = data["candidates"][0]["content"]["parts"][0]["text"]

            result = json.loads(text)

            return {
                "recommended_crop": result.get(
                    "recommended_crop",
                    "Unknown"
                ),
                "reason": result.get(
                    "reason",
                    "No detailed reason provided."
                ),
            }

        except requests.exceptions.RequestException as e:
            print("===== GEMINI REQUEST ERROR =====")
            print(str(e))
            print("================================")

            raise RuntimeError(
                f"Gemini request failed: {str(e)}"
            )

        except (json.JSONDecodeError, KeyError, IndexError) as e:
            print("===== GEMINI RESPONSE PARSING ERROR =====")
            print(type(e).__name__, str(e))
            print("==========================================")

            raise RuntimeError(
                f"Failed to parse Gemini recommendation response: "
                f"{type(e).__name__}: {str(e)}"
            )