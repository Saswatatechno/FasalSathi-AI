import os
from typing import Any, Dict, List, Optional

import httpx
from fastapi import HTTPException

from app.schemas.market_schema import MarketInfo, MarketPriceResponse


DATA_GOV_RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070"
DATA_GOV_API_URL = f"https://api.data.gov.in/resource/{DATA_GOV_RESOURCE_ID}"
DEFAULT_CROP = "tomato"
REQUEST_TIMEOUT_SECONDS = 30.0
MAX_RECORDS = 20


class MarketService:
    """Fetch and normalize official mandi prices from data.gov.in."""

    def __init__(self) -> None:
        self.api_key = os.getenv("DATA_GOV_API_KEY")

    async def get_market_prices(
        self,
        crop: Optional[str] = DEFAULT_CROP,
        location: Optional[str] = None,
    ) -> MarketPriceResponse:
        crop_query = (crop or DEFAULT_CROP).strip()
        location_query = location.strip() if location and location.strip() else None

        if not crop_query:
            raise HTTPException(status_code=400, detail="Crop is required.")

        if not self.api_key:
            raise HTTPException(
                status_code=503,
                detail="Market data service is not configured. Set DATA_GOV_API_KEY in backend/.env.",
            )

        # Keep the upstream response small. We only need fields required to
        # display a market and compare modal prices.
        params: Dict[str, Any] = {
            "api-key": self.api_key,
            "format": "json",
            "filters[commodity]": crop_query,
            "limit": MAX_RECORDS,
            "fields": "state,district,market,commodity,variety,grade,arrival_date,min_price,max_price,modal_price",
        }

        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(30.0, connect=10.0)
            ) as client:
                response = await client.get(DATA_GOV_API_URL, params=params)
                response.raise_for_status()
                payload = response.json()
        except httpx.TimeoutException as exc:
            raise HTTPException(status_code=504, detail="Market data source timed out.") from exc
        except httpx.HTTPStatusError as exc:
            raise HTTPException(
                status_code=502,
                detail="Market data source returned an error.",
            ) from exc
        except (httpx.RequestError, ValueError) as exc:
            raise HTTPException(
                status_code=502,
                detail="Unable to retrieve market data from the official source.",
            ) from exc

        if payload.get("status") not in (None, "ok"):
            raise HTTPException(
                status_code=502,
                detail="Market data source returned an invalid response.",
            )

        records = payload.get("records") or []
        markets = self._normalize_records(records, location_query)
        best_market = max(markets, key=lambda market: market.price) if markets else None

        return MarketPriceResponse(
            success=True,
            crop=crop_query,
            markets=markets,
            best_market=best_market,
            source="data.gov.in / AGMARKNET",
        )

    @staticmethod
    def _normalize_records(
        records: List[Dict[str, Any]],
        location: Optional[str] = None,
    ) -> List[MarketInfo]:
        normalized: List[MarketInfo] = []
        location_lower = location.lower() if location else None

        for record in records:
            market_name = str(record.get("market") or "").strip()
            state = str(record.get("state") or "").strip()
            district = str(record.get("district") or "").strip()
            modal_price = MarketService._to_float(record.get("modal_price"))

            if not market_name or modal_price is None or modal_price < 0:
                continue

            location_text = ", ".join(part for part in (district, state) if part)

            if location_lower:
                searchable = " ".join((market_name, district, state)).lower()
                if location_lower not in searchable:
                    continue

            normalized.append(
                MarketInfo(
                    market=market_name,
                    location=location_text or state or district or "Unknown",
                    price=modal_price,
                    unit="quintal",
                    min_price=MarketService._to_float(record.get("min_price")),
                    max_price=MarketService._to_float(record.get("max_price")),
                    arrival_date=str(record.get("arrival_date") or "") or None,
                    variety=str(record.get("variety") or "") or None,
                    grade=str(record.get("grade") or "") or None,
                    source="data.gov.in / AGMARKNET",
                )
            )

        return normalized

    @staticmethod
    def _to_float(value: Any) -> Optional[float]:
        if value is None or value == "":
            return None
        try:
            return float(value)
        except (TypeError, ValueError):
            return None


market_service = MarketService()
