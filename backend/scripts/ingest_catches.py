import os
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")  # 👈 default to docker service
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

# Build database URL
DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

engine = create_engine(DATABASE_URL)

EXCEL_PATH = "/data/catches.xlsx"

def ingest():
    df = pd.read_excel(EXCEL_PATH)

    # Normalize column names just in case
    df.columns = [c.lower() for c in df.columns]

    insert_sql = text("""
        INSERT INTO catches (
            species,
            length_inches,
            weight_lbs,
            latitude,
            longitude,
            date_caught,
            time_of_day,
            lure,
            weather,
            notes,
            photo_url
        )
        VALUES (
            :species,
            :length_inches,
            :weight_lbs,
            :latitude,
            :longitude,
            :date_caught,
            :time_of_day,
            :lure,
            :weather,
            :notes,
            :photo_url
        )
        ON CONFLICT DO NOTHING
    """)

    with engine.begin() as conn:
        for _, row in df.iterrows():
            conn.execute(insert_sql, {
                "species": row["species"],
                "length_inches": row["length_inches"],
                "weight_lbs": row["weight_lbs"],
                "latitude": None if row["latitude"] == "Private" else row["latitude"],
                "longitude": None if row["longitude"] == "Private" else row["longitude"],
                "date_caught": row["date_caught"],
                "time_of_day": row["time_of_day"],
                "lure": row["lure"],
                "weather": row["weather"],
                "notes": row["notes"],
                "photo_url": row["photo_url"]
            })

    print("🎣 Catch data ingestion complete.")

if __name__ == "__main__":
    ingest()
