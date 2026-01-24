from pydantic import BaseModel

class AboutMeOut(BaseModel):
    title: str
    strapline: str
    bio: str
    profile_image: str | None
    links: str | None

    class Config:
        from_attributes = True
