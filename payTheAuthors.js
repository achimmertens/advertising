const fs = require('fs');
if (process.argv.length < 3) {
  console.log("Please add a config file.");
  console.log("If you really want to pay, add a 'doit'");
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


let reward = campaignConfig.reward + " HIVE";
const unpaidAuthors = campaignConfig.authors.filter(author => !author.payed);
//unpaidAuthors
campaignConfig.authors.forEach(author => {
  if (!author.payed) {
    author.payed = reward;
    console.log("Empfänger = ", author.author, " Reward = ", reward, " Memo = ", memo);
    if (process.argv[3] == "doit") {
      hive.broadcast.transfer(privateKey, sender, author.author, reward, memo, function (err, result) {
        if (err) {
          console.error('Fehler beim Senden von HIVE:', err);
        } else {
          console.log('HIVE erfolgreich gesendet:', result);
        }
      });
      console.log("Der Empfänger = ", author.author, " wurde soeben bezahlt mit ", reward);
    } 
    else {
      console.log("This was only simulated. If you really want to pay, add a 'doit' as third parameter.");
    }
  } else {
    console.log('The Author', author.author, " was already paid.")
  } 
  
});
if (process.argv[3] == "doit") {
  fs.writeFile(process.argv[2], JSON.stringify(campaignConfig, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}


// ![grafik.png](https://files.peakd.com/file/peakd-hive/advertisingbot2/23tHb6kVW6cC8QKyPVkJei2ocgmXqHswfncYp3R8KDtHfrMtEx1k8fVbhnGGCioefUbHH.png)



