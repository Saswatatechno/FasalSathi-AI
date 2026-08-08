from pydantic import BaseModel, Field
from typing import List, Optional

class MarketInfo(BaseModel):
    market_name: str = Field(..., description="Name of the mandi/market")
    location: str = Field(..., description="City or district location")
    price_per_kg: float = Field(..., description="Price in INR per kg")
    distance_km: float = Field(..., description="Distance from farm in kilometers")

class MarketPriceResponse(BaseModel):
    success: bool = Field(default=True, description="Indicates if request succeeded")
    crop: str = Field(default="tomato", description="Queried crop name")
    markets: List[MarketInfo] = Field(default_factory=list, description="List of market prices")
    best_market: Optional[MarketInfo] = Field(default=None, description="Market with optimal price/distance ratio")
