const dhive = require('@hiveio/dhive');

async function getFollower(username) {
  let client = new dhive.Client('https://api.hive.blog');

  try {
    const result = await client.call('condenser_api', 'get_follow_count', [username]);
    console.log('Anzahl der Follower: ', result.follower_count);
    return result.follower_count;
  } catch (err) {
    console.error('Es gab einen Fehler beim Abrufen der Follower-Anzahl: ', err);
    throw err;
  }
}

module.exports = getFollower;
