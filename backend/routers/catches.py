from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional

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


@router.get("", response_model=list[CatchOut])
def get_catches(
    db: Session = Depends(get_db),
    species: Optional[str] = Query(None),
    year: Optional[int] = Query(None),
    water_body: Optional[str] = Query(None),
    conditions: Optional[str] = Query(None),
    limit: Optional[int] = Query(20, ge=1, le=100),
    offset: Optional[int] = Query(0, ge=0),
):
    """Get catches with optional filters and pagination"""
    query = db.query(Catches)
    
    if species:
        query = query.filter(Catches.species == species)
    
    if year:
        # Filter by year from date_caught - cast to int for comparison
        query = query.filter(
            func.extract('year', Catches.date_caught) == float(year)
        )
    
    if water_body:
        query = query.filter(Catches.water_body == water_body)
    
    if conditions:
        query = query.filter(Catches.weather == conditions)
    
    return query.order_by(Catches.date_caught.desc()).limit(limit).offset(offset).all()


@router.get("/species", response_model=list[str])
def get_species_list(db: Session = Depends(get_db)):
    """Get list of unique species from catches"""
    species_list = db.query(Catches.species).distinct().filter(
        Catches.species.isnot(None)
    ).all()
    return [s[0] for s in species_list if s[0]]


@router.get("/water-bodies", response_model=list[str])
def get_water_bodies(db: Session = Depends(get_db)):
    """Get list of unique water bodies from catches"""
    water_bodies = db.query(Catches.water_body).distinct().filter(
        Catches.water_body.isnot(None)
    ).all()
    return sorted([w[0] for w in water_bodies if w[0]])


@router.get("/years", response_model=list[int])
def get_years(db: Session = Depends(get_db)):
    """Get list of unique years from catches"""
    years = db.query(
        func.extract('year', Catches.date_caught).label('year')
    ).distinct().filter(
        Catches.date_caught.isnot(None)
    ).all()
    return sorted([int(y[0]) for y in years if y[0]], reverse=True)