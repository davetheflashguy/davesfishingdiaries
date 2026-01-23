CREATE TABLE IF NOT EXISTS about_me (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    strapline TEXT,
    bio TEXT,
    profile_image TEXT,
    links JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
