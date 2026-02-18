from sqlalchemy import Column, Integer, String, Text, Float, Date, Time
from database import Base

class AboutMe(Base):
    __tablename__ = "about_me"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    strapline = Column(String)
    bio = Column(Text)
    profile_image = Column(String)
    links = Column(Text)

class Catches(Base):
    __tablename__ = "catches"
    id = Column(Integer, primary_key=True, index=True)
    species = Column(String, index=True)
    length_inches = Column(Float)
    weight_lbs = Column(String)  # Stored as strings like '1lb 2oz', 'NaN'
    latitude = Column(Float)
    longitude = Column(Float)
    date_caught = Column(Date)
    time_of_day = Column(Time)
    lure = Column(String)
    water_body = Column(String)
    weather = Column(String)
    notes = Column(Text)
    photo_url = Column(String)
