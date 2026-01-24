from sqlalchemy import Column, Integer, String, Text
from database import Base

class AboutMe(Base):
    __tablename__ = "about_me"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    strapline = Column(String)
    bio = Column(Text)
    profile_image = Column(String)
    links = Column(Text)
