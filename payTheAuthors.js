//const fs = require('fs');
const hive = require('');
const { privateKey } = require('./config');

//module.exports = async function postContentToHive(privateKey,parentAuthor,parentPermlink,author,permlink,title,body,tags,beneficiaries)

// Konfiguration der Hive-API
hive.api.setOptions({ url: 'https://api.hive.blog' });

let sender = 'advertisingbot2'; // Ihr Benutzername
let recipient = 'advertisingbot'; // Benutzername des Empfängers
let amount = '1.000 HIVE'; // Menge an HIVE, die gesendet werden soll, z.B. '1.000 HIVE'
let memo = 'Mein erster Geldversende-Test'; // Optionaler Memo-Text

hive.broadcast.transfer(privateKey, sender, recipient, amount, memo, function(err, result) {
  if (err) {
    console.error('Fehler beim Senden von HIVE:', err);
  } else {
    console.log('HIVE erfolgreich gesendet:', result);
  }
});


