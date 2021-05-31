CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  profile_url TEXT DEFAULT 'https://supersimple.com/wp-content/uploads/peek-a-boo-800-800-200x200.jpg',
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_time TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  img_url TEXT DEFAULT 'https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  host_username TEXT NOT NULL
    REFERENCES users ON DELETE CASCADE
);

CREATE TABLE moodboard (
  event_id INTEGER
    REFERENCES events ON DELETE CASCADE,
  inspiration_url TEXT,
  restaurant_name TEXT,
	restaurant_address TEXT
);
