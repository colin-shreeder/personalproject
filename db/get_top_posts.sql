SELECT posts.img, posts.title, posts.content, users.username, posts.upvotes, posts.id
FROM posts
JOIN users 
ON posts.author_id = users.id
ORDER BY posts.upvotes DESC;