const fs = require('fs');
const moment = require('moment');
const postContentToHive = require('./postContentToHive.js');
const config = require('./config.js');  //Advertisingbot2
//const { title } = require('process');
const privateKey = config.privateKey;

const campaignConfig = require('./' + process.argv[2]);
const permlink = campaignConfig.permlink;
const title = campaignConfig.title;

const now = moment();
const CW = now.isoWeek();
console.log(`Die aktuelle Kalenderwoche ist ${CW}.`);

const parentAuthor = ''; // Leer lassen, da es sich um einen eigenständigen Post handelt
const parentPermlink = 'hive-154303' // Community = Hive Marketing
//'hive-150329' // Community = ProofOfBrain
//'hive-167922'; // Community = LeoFinance 
//'hive-155221'  // Community=Alive
//'hive-187719';  // Cummunity=Beer // hive-121566'; // Community = DACH
// 'hive-154303' // Community = Hive Marketing
//const parentPermlink = 'hive-153112' // Community = API Testing
const author = 'advertisingbot2';
const beneficiaries = [{ account: 'anobel', weight: 10000 }]; //const beneficiaries = [{ account: 'anobel', weight: 10000 }];
const bodyFilePath = './Campaign' + campaignConfig.campaignID + '.md';  // Den Inhalt der body.md-Datei lesen
const body = fs.readFileSync(bodyFilePath, 'utf-8');
const tags = campaignConfig.tags;
console.log(tags);



postContentToHive(privateKey,parentAuthor,parentPermlink,author,permlink,title,body,tags, beneficiaries);

