from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Catches
from schemas import CatchOut

router = APIRouter(prefix="/catches", tags=["catches"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[CatchOut])
def get_catches(db: Session = Depends(get_db)):
    return db.query(Catches).all()