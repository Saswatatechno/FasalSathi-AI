from typing import List, Optional

from pydantic import BaseModel, Field


class MarketInfo(BaseModel):
    market: str = Field(..., description="Name of the mandi/market")
    location: str = Field(..., description="District and state location")
    price: float = Field(..., ge=0, description="Modal market price in INR per quintal")
    unit: str = Field(default="quintal", description="Price unit")
    min_price: Optional[float] = Field(default=None, ge=0, description="Minimum reported price in INR per quintal")
    max_price: Optional[float] = Field(default=None, ge=0, description="Maximum reported price in INR per quintal")
    arrival_date: Optional[str] = Field(default=None, description="Commodity arrival date from the source")
    variety: Optional[str] = Field(default=None, description="Commodity variety")
    grade: Optional[str] = Field(default=None, description="Commodity grade")
    source: str = Field(default="data.gov.in / AGMARKNET", description="Market data source")


class MarketPriceResponse(BaseModel):
    success: bool = Field(default=True, description="Indicates if request succeeded")
    crop: str = Field(..., description="Queried crop name")
    markets: List[MarketInfo] = Field(default_factory=list, description="Normalized market prices")
    best_market: Optional[MarketInfo] = Field(default=None, description="Market with the highest comparable modal price")
    source: str = Field(default="data.gov.in / AGMARKNET", description="Market data source")
