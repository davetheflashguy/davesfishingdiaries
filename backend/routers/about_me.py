from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import AboutMe
from schemas import AboutMeOut

router = APIRouter(prefix="/about-me", tags=["about-me"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=AboutMeOut)
def get_about_me(db: Session = Depends(get_db)):
    return db.query(AboutMe).first()
