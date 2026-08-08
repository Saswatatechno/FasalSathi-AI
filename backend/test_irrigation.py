from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


VALID_PAYLOAD = {
    "crop": "Tomato",
    "soil_moisture": 30,
    "temperature": 32,
    "rainfall_probability": 20,
    "growth_stage": "Vegetative",
    "nitrogen": 40,
    "phosphorus": 30,
    "potassium": 70,
}


def test_irrigation_and_fertilizer_advisory():
    response = client.post("/api/irrigation/recommend", json=VALID_PAYLOAD)

    assert response.status_code == 200
    body = response.json()

    assert body["success"] is True
    assert body["data"]["irrigation"]["recommendation"]
    assert body["data"]["irrigation"]["reason"]
    assert body["data"]["fertilizer"]["recommendation"]
    assert body["data"]["fertilizer"]["reason"]
    assert "Nitrogen" in body["data"]["fertilizer"]["nutrients_needing_attention"]
    assert "Potassium" in body["data"]["fertilizer"]["nutrients_needing_attention"]


def test_high_rainfall_can_delay_irrigation():
    payload = {**VALID_PAYLOAD, "soil_moisture": 30, "rainfall_probability": 80}
    response = client.post("/api/irrigation/recommend", json=payload)

    assert response.status_code == 200
    assert "delay" in response.json()["data"]["irrigation"]["recommendation"].lower()


def test_adequate_moisture_does_not_require_immediate_irrigation():
    payload = {**VALID_PAYLOAD, "soil_moisture": 70, "rainfall_probability": 10}
    response = client.post("/api/irrigation/recommend", json=payload)

    assert response.status_code == 200
    recommendation = response.json()["data"]["irrigation"]["recommendation"].lower()
    assert "not be required immediately" in recommendation


def test_invalid_ranges_are_rejected():
    payload = {**VALID_PAYLOAD, "soil_moisture": 120}
    response = client.post("/api/irrigation/recommend", json=payload)

    assert response.status_code == 422


def test_invalid_crop_is_rejected():
    payload = {**VALID_PAYLOAD, "crop": "Banana"}
    response = client.post("/api/irrigation/recommend", json=payload)

    assert response.status_code == 422


def test_missing_nutrient_is_rejected():
    payload = {key: value for key, value in VALID_PAYLOAD.items() if key != "nitrogen"}
    response = client.post("/api/irrigation/recommend", json=payload)

    assert response.status_code == 422
