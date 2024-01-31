SELECT 
  author, root_title, last_update, url, body, total_vote_weight
FROM 
  Comments 
WHERE 
  CONTAINS(body, '"!CHARY"')
ORDER BY last_update DESC;

