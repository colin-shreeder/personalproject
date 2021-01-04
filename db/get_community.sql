SELECT communities.id, communities.name, communities.description, communities.topics
FROM communities
WHERE communities.id = $1;