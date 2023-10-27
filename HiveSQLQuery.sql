SELECT 
  author, root_title, last_update, url, body, total_vote_weight
FROM 
  Comments 
WHERE CONTAINS(body, '"!CHARY"')
  AND body LIKE '%!CHARY%' COLLATE Latin1_General_CS_AS
ORDER BY last_update DESC;
