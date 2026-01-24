from fastapi import FastAPI
from routers import about_me

app = FastAPI(title="Dave's Fishing Diaries API")

app.include_router(about_me.router)
