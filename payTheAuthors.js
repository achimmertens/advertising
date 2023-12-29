const fs = require('fs');
if (process.argv.length < 3) {
  console.log("Please add a config file.");
  process.exit(1);
}
const campaignConfig = require('./' + process.argv[2]);

const hive = require('@hiveio/hive-js');
const { privateKey } = require('./config');
//const campaignConfigParsed = JSON.parse(campaignConfig);


//module.exports = async function postContentToHive(privateKey,parentAuthor,parentPermlink,author,permlink,title,body,tags,beneficiaries)

// Konfiguration der Hive-API
hive.api.setOptions({ url: 'https://api.hive.blog' });


let sender = 'advertisingbot2'; // Ihr Benutzername
// let recipient = 'advertisingbot'; // Benutzername des Empfängers
//let amount = '0.001 HIVE'; // Menge an HIVE, die gesendet werden soll, z.B. '1.000 HIVE'
let memo = 'Thank you for doing advertising with campaign '+campaignConfig.campaignUrl; // Optionaler Memo-Text


let reward = campaignConfig.reward+" HIVE"; 

for (let i = 0; i < campaignConfig.authors.length; i++) {
    let recipient = campaignConfig.authors[i].author;
    console.log("Empfänger = ", recipient, " Reward = ", reward, " Memo = ", memo); 
    hive.broadcast.transfer(privateKey, sender, recipient, reward, memo, function(err, result) {
         if (err) {
           console.error('Fehler beim Senden von HIVE:', err);
         } else {
           console.log('HIVE erfolgreich gesendet:', result);
         }
       });
  }





