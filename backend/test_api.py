from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_endpoints():
    print("Testing /api/health...")
    r = client.get("/api/health")
    assert r.status_code == 200, f"Health check failed: {r.text}"
    assert r.json()["status"] == "healthy"

    print("\nTesting POST /api/disease/predict...")
    r = client.post("/api/disease/predict")
    assert r.status_code == 200, f"Disease predict failed: {r.text}"
    assert r.json()["success"] is True

    print("\nTesting POST /api/crop/recommend...")
    crop_payload = {
        "nitrogen": 90,
        "phosphorus": 42,
        "potassium": 43,
        "ph": 6.5,
        "temperature": 20.8,
        "humidity": 82.0,
        "rainfall": 202.9,
    }
    r = client.post("/api/crop/recommend", json=crop_payload)
    assert r.status_code == 200, f"Crop recommend failed: {r.text}"
    assert r.json()["success"] is True

    print("\nTesting POST /api/irrigation/recommend...")
    irrigation_payload = {
        "crop": "Tomato",
        "soil_moisture": 30.0,
        "temperature": 28.5,
        "rainfall_probability": 10.0,
        "growth_stage": "Vegetative",
        "nitrogen": 90.0,
        "phosphorus": 42.0,
        "potassium": 43.0,
    }
    r = client.post("/api/irrigation/recommend", json=irrigation_payload)
    assert r.status_code == 200, f"Irrigation recommend failed: {r.text}"
    assert r.json()["success"] is True
    assert "data" in r.json()

    print("\nTesting GET /api/market/prices?crop=tomato...")
    r = client.get("/api/market/prices?crop=tomato")
    assert r.status_code == 200, f"Market prices failed: {r.text}"
    assert r.json()["success"] is True

    print("\nALL API ENDPOINTS PASSED VERIFICATION SUCCESSFULLY!")


if __name__ == "__main__":
    test_endpoints()
