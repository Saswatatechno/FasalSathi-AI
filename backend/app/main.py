from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes.disease import router as disease_router
from app.routes.crop import router as crop_router
from app.routes.irrigation import router as irrigation_router
from app.routes.market import router as market_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Smart Crop Advisory & Farm Resource Optimization Platform API",
    version="0.1.0"
)

# Configure CORS
origins = [
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check Endpoint
@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME
    }

# Register Feature Routers under /api prefix
app.include_router(disease_router, prefix="/api")
app.include_router(crop_router, prefix="/api")
app.include_router(irrigation_router, prefix="/api")
app.include_router(market_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
