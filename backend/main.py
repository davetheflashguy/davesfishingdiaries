from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import about_me, catches

app = FastAPI(title="Dave's Fishing Diaries API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(about_me.router)
app.include_router(catches.router)