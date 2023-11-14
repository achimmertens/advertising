// Importieren Sie die dhive-Bibliothek
const dhive = require('@hiveio/dhive');

async function getFollower(username) {
// Erstellen Sie einen neuen Client
let client = new dhive.Client('https://api.hive.blog');

// Definieren Sie den Benutzernamen
//let username = 'achimmertens';

// Rufen Sie die Follower-Liste ab
client.call('condenser_api', 'get_follow_count', [username])
    .then(result => {
        console.log('Anzahl der Follower: ', result.follower_count);
        return result.follower_count
    })
    .catch(err => {
        console.error('Es gab einen Fehler beim Abrufen der Follower-Anzahl: ', err);
        return err;
    });  
};

module.exports = getFollower;
