import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import about_me, catches

app = FastAPI(title="Dave's Fishing Diaries API")

# Configure CORS - support both development and production
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

if ENVIRONMENT == "production":
    # Production: only allow your domain
    allowed_origins = [
        "https://davesfishingdiaries.com",
        "https://www.davesfishingdiaries.com",
    ]
else:
    # Development: allow localhost
    allowed_origins = [
        "http://localhost:4200",
        "http://localhost:80",
        "http://localhost",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(about_me.router)
app.include_router(catches.router)