import os
import sys
from dotenv import load_dotenv
from google import genai
from google.genai import types

# 1. Load environment variables
load_dotenv(dotenv_path=".env", override=True)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

print(f"Gemini API key loaded: {bool(api_key)}")

# 2. Initialize Gemini Client
client = genai.Client(api_key=api_key)
model_name = "gemini-3.6-flash"

# 3. Locate image file (handling extension variants like rice_blast.jpg, rice_blast.jpg.jpeg, etc.)
test_images_dir = os.path.join(os.path.dirname(__file__), "test_images")
possible_paths = [
    os.path.join(test_images_dir, "rice_blast.jpg.jpeg"),
    os.path.join(test_images_dir, "rice_blast.jpg"),
    os.path.join(test_images_dir, "rice_blast.jpeg")
]

image_path = None
for path in possible_paths:
    if os.path.exists(path):
        image_path = path
        break

if not image_path:
    available_files = os.listdir(test_images_dir) if os.path.exists(test_images_dir) else []
    raise FileNotFoundError(f"Test image not found in {test_images_dir}. Available files: {available_files}")

print(f"Loading real test image from: {image_path}")
with open(image_path, "rb") as f:
    image_bytes = f.read()

print(f"Image loaded successfully ({len(image_bytes)} bytes)")

# Determine mime type
mime_type = "image/jpeg"
if image_path.lower().endswith(".png"):
    mime_type = "image/png"
elif image_path.lower().endswith(".webp"):
    mime_type = "image/webp"

# 4. Prompt construction
prompt = """You are an expert agricultural crop advisory system for smallholder farmers.
Analyze the provided crop/leaf image carefully.

Return your analysis strictly in JSON format matching this schema:
{
  "crop": "<Identified crop name or 'Unknown'>",
  "disease_or_pest": "<Likely disease/pest name or 'Healthy' or 'Uncertain'>",
  "qualitative_confidence": "<'High' or 'Medium' or 'Low'>",
  "observations": "<Detailed visual symptoms observed on leaf/plant>",
  "advisory": "<Actionable agricultural advisory and treatment recommendations>"
}

Strict Rules:
- Identify the crop if possible based on leaf shape, venation, or stem features.
- Identify the likely disease or pest if symptoms are visible.
- Use qualitative confidence ONLY ('High', 'Medium', or 'Low'). Never invent a numerical confidence percentage score.
- If the image is unclear or insufficient for definitive diagnosis, state so clearly in observations and set qualitative_confidence to 'Low'.
"""

print(f"\nSending image to Gemini model: {model_name}...")

try:
    response = client.models.generate_content(
        model=model_name,
        contents=[
            prompt,
            types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
        ]
    )
    
    print("\n" + "="*50)
    print("GEMINI ANALYSIS RESPONSE")
    print("="*50)
    print(response.text.strip())
    print("="*50)

except Exception as e:
    print(f"\nERROR running Gemini analysis: {type(e).__name__}: {str(e)}")
    sys.exit(1)