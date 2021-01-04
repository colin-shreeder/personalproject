CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL, 
    password TEXT NOT NULL
);

CREATE TABLE communities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(100) NOT NULL,
    topics TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(45) NOT NULL,
    img TEXT,
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES users(id),
    upvotes INTEGER,
    community_id INTEGER REFERENCES community(id)
);