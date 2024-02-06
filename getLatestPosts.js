const dhive = require('@hiveio/dhive');
const fs = require('fs');

// Initialize a connection to a Hive node
const client = new dhive.Client('https://api.hive.blog');

// Fetch the ten newest posts
async function getNewestPosts() {
  try {
    const posts = await client.database.getDiscussions('created', {
      limit: 10, // Number of posts to retrieve
      tag: 'hiveusers', // Specify the tag or community
    });

    // Extract relevant information from each post
    const postInfo = posts.map(post => ({
      author: post.author,
      url: `https://hive.blog${post.url}`,
      title: post.title,
    }));

    // Write the data to a JSON file
    fs.writeFileSync('hive_posts.json', JSON.stringify(postInfo, null, 2));
    console.log('Data saved to hive_posts.json');
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}

// Call the function to retrieve and save the data
getNewestPosts();
