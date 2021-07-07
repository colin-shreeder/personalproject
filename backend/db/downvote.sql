UPDATE posts 
SET
upvotes = $1 - 1
WHERE id = $2;

SELECT * FROM posts;