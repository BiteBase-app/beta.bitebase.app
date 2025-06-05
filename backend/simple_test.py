#!/usr/bin/env python3
"""
Simple backend test to verify basic functionality
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI(
    title="BiteBase Intelligence API",
    description="Restaurant Intelligence Backend",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return JSONResponse(
        content={
            "message": "BiteBase Intelligence API is running!",
            "status": "healthy",
            "version": "1.0.0",
            "docs": "/docs",
        }
    )

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "status": "ok",
            "service": "bitebase-intelligence",
            "version": "1.0.0",
        }
    )

@app.get("/api/v1/test")
async def test_endpoint():
    return JSONResponse(
        content={
            "message": "API test successful",
            "data": {
                "restaurant_intelligence": "active",
                "pos_integration": "ready",
                "market_intel": "ready",
                "social_media": "ready",
            }
        }
    )

if __name__ == "__main__":
    uvicorn.run("simple_test:app", host="0.0.0.0", port=8001, reload=True)