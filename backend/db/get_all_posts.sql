SELECT posts.img, posts.title, posts.content, users.username, posts.upvotes, posts.id, communities.name
FROM posts 
JOIN users ON posts.author_id = users.id
JOIN communities ON communities.id = posts.community_id
ORDER BY posts.id;
