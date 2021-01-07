CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL, 
    password TEXT NOT NULL
);

CREATE TABLE communities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(200) NOT NULL,
    topics TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(200) NOT NULL,
    img TEXT,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id),
    upvotes INTEGER,
    community_id INTEGER REFERENCES communities(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id)
);