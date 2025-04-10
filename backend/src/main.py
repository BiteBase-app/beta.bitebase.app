from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Bitebase Intelligence Backend",
             description="Backend service for Bitebase Intelligence",
             version="0.1.0")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to Bitebase Intelligence Backend Service"}
