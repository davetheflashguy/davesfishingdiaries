CREATE TABLE IF NOT EXISTS catches (
    id SERIAL PRIMARY KEY,
    species TEXT NOT NULL,
    length_inches NUMERIC,
    weight_lbs TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    date_caught DATE NOT NULL,
    time_of_day TIME,
    lure TEXT,
    weather TEXT,
    notes TEXT,
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
