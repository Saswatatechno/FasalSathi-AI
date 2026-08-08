from app.routes.disease import router as disease_router
from app.routes.crop import router as crop_router
from app.routes.irrigation import router as irrigation_router
from app.routes.market import router as market_router

__all__ = [
    "disease_router",
    "crop_router",
    "irrigation_router",
    "market_router",
]
