from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.schemas.market_schema import MarketPriceResponse
from app.services.market_service import market_service

router = APIRouter(prefix="/market", tags=["Market Price Comparison"])

@router.get("/prices", response_model=MarketPriceResponse)
async def get_market_prices(crop: Optional[str] = Query(default="tomato", description="Name of crop")):
    """
    GET /api/market/prices?crop=tomato
    Returns market prices across nearby mandis and highlights the best available price.
    """
    try:
        return await market_service.get_market_prices(crop)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Market price retrieval failed: {str(e)}")
