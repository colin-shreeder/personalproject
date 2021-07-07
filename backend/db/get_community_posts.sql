SELECT posts.img, posts.title, posts.content, users.username, users.profile_pic, posts.upvotes, posts.id
FROM posts
JOIN users 
ON posts.author_id = users.id
WHERE community_id = $1;