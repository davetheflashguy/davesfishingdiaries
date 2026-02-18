from pydantic import BaseModel, field_validator
from datetime import date, time
import math

class AboutMeOut(BaseModel):
    title: str
    strapline: str
    bio: str
    profile_image: str | None
    links: str | None

    class Config:
        from_attributes = True
    
class CatchOut(BaseModel):
    id: int
    species: str | None
    length_inches: float | None
    weight_lbs: str | None  # String to handle formats like '1lb 2oz', 'NaN'
    latitude: float | None
    longitude: float | None
    date_caught: date | None
    time_of_day: time | None
    lure: str | None
    water_body: str | None
    weather: str | None
    notes: str | None
    photo_url: str | None

    class Config:
        from_attributes = True

    @field_validator('length_inches', 'latitude', 'longitude', mode='before')
    @classmethod
    def handle_nan(cls, v):
        """Convert NaN values to None for JSON serialization"""
        if v is not None and isinstance(v, (float, int)):
            if math.isnan(float(v)):
                return None
        return v
