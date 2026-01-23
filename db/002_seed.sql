INSERT INTO about_me (
    title,
    strapline,
    bio,
    profile_image,
    links
) VALUES (
    'Dave Collier',
    'Software engineer by day, angler by obsession.',
    'Senior software engineer with over a decade of experience building scalable systems in regulated environments. Outside of work, I''m usually chasing smallmouth bass, exploring rivers, or documenting fishing trips.',
    '/images/profile.jpg',
    '{
      "github": "https://github.com/davesfishingdiaries",
      "linkedin": "https://linkedin.com/in/davecollier",
      "instagram": "https://instagram.com/davesfishingdiaries"
    }'::jsonb
);
