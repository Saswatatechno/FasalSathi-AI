from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.schemas.market_schema import MarketPriceResponse
from app.services.market_service import market_service

router = APIRouter(prefix="/market", tags=["Market Price Comparison"])


@router.get("/prices", response_model=MarketPriceResponse)
async def get_market_prices(
    crop: Optional[str] = Query(default="tomato", description="Name of crop"),
    location: Optional[str] = Query(default=None, description="Optional state, district, or market location filter"),
):
    """
    GET /api/market/prices?crop=rice&location=West Bengal
    Returns normalized mandi prices and highlights the highest available modal price.
    """
    try:
        return await market_service.get_market_prices(crop=crop, location=location)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Market price retrieval failed.")
