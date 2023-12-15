const sql = require('mssql');
const { password1 } = require('./config');
const fs = require('fs');
if (process.argv.length < 3) {
  console.log("Please add a config file.");
  process.exit(1);
}
const campaignConfig = require('./' + process.argv[2]);
const budget = campaignConfig.budget; // Hive
const reward = campaignConfig.reward; // Hive per participant
const maxAdvertisers = budget/reward;
const advertisingText = campaignConfig.advertisingText;
const sponsor = campaignConfig.sponsor;
const campaignID = campaignConfig.campaignID;
const campaignUrl = campaignConfig.campaignUrl;
const numberOfDays = campaignConfig.numberOfDays;
const startDate = campaignConfig.startDate;
// Todo: title = campaignConfig.campaignURL - https:/...
const getMetaData = require('./getMetaData');
const getFollower = require('./getFollower.js');
const getDateFrame = require('./getDateFrame.js');

// Konfigurationsobjekt für die Verbindung zum SQL Server
const config = {
  user: 'Hive-achimmertens',
  password: password1,
  server: 'vip.hivesql.io',
  port: 1433,
  database: 'DBHive',
  options: {
    trustServerCertificate: true
  }
};

// Funktion zum Ausführen des SQL-Skripts
async function executeSQLScript(searchParameter) {
  console.log('searchParameter = ', searchParameter);
  try {
    // Verbindung zum SQL Server herstellen
    await sql.connect(config);
    const queryTemplate = fs.readFileSync('HiveSQLQuery.sql', 'utf8');
    const query = queryTemplate.replace(/!CHARY/g, searchParameter);
    const result = await sql.query(query);
    console.log("Result of the Query = ", result.recordset);
    await sql.close();
    return result.recordset
  } catch (error) {
    console.error(error);
  }
}


// Funktion zum Extrahieren des Accountnamens aus der URL
function extractAccountFromUrl(url) {
  const match = url.match(/@([^/]+)/);
  if (match) {
    return match[1];
  }
  return null;
}

// Funktion zum Modifizieren der URL
function modifyUrl(url) {
  const regex = /\/hive-.*?\/(@.*?)\//;
  const match = url.match(regex);
  if (match) {
    const modifiedUrl = `https://peakd.com${url.split('#')[0]}`;
    return modifiedUrl;
  }
  return null;
}

// Funktion zum Ersetzen der Platzhalter in der Vorlagendatei
async function fillTemplate(campaignID, campaignUrl, dateRange, recordset, maxAdvertisers, reward, budget, sponsor) {
  const template = fs.readFileSync('ReportTemplate.md', 'utf8');
  let tableString = '';
  let filledTemplate = template;
  console.log('Filledtemplate = ' + filledTemplate);
  console.log('Recordset = ' + recordset);
  const recordsetObj = JSON.parse(recordset);
  let numberOfAdvertisers = 0;
  // loop until number of hits or maxAdvertisers is reached
  for (let i = 0; i < Math.min(recordsetObj.length, maxAdvertisers); i++) {
    console.log('Filltemplate RecordsetObj[i]: ' + JSON.stringify(recordsetObj[i]));
    console.log('Author = ' + JSON.stringify(recordsetObj[i].author));
    const author = recordsetObj[i].author 
    console.log('author = ', author);
    const NumberOfFollowers = await getFollower(author);
    const weburl = recordsetObj[i].weburl;
    console.log('weburl = ', weburl);
    const body = JSON.stringify(recordsetObj[i].body);
    // truncate the body to the first 10 words
    // stringWithoutCR = body.replace(/\r/g, ''); // remove Carriege Return
    // const words = stringWithoutCR.split(' ');
    // const truncatedWords = words.slice(0, 10);
    // const truncatedBody = truncatedWords.join(' ');
    // if (!truncatedBody.endsWith('"')) {
    //  truncatedBodyWithEnd = truncatedBody+' ..."';
    // }
    // else {
    //   truncatedBodyWithEnd = truncatedBody;
    // }
    // console.log('truncatedBodyWithEnd = ', truncatedBodyWithEnd);
    const url = recordsetObj[i].url;
    const [firstImageUrl, authorReputation] = await getMetaData.getMetaData(url);
    console.log("authorReputation = ", authorReputation);
    recordset[i].originAuthorReputation = authorReputation;
    console.log("NumberOfFollowers = ", NumberOfFollowers);
    lastUpdateTrunc=((JSON.stringify(recordsetObj[i].last_update)).slice(0, -9)).slice(1);
    tableString=tableString+'|'+lastUpdateTrunc+'|'+reward+'|@'+author+'|'+(authorReputation/1000000000).toFixed(2)+'|'+NumberOfFollowers+'|'+url+'|'+firstImageUrl+'|\n';
    numberOfAdvertisers = i;
  }
  let rest = budget - (numberOfAdvertisers+1)*reward;
  filledTemplate = filledTemplate.replace(`[TABLE]`, tableString);
  filledTemplate = filledTemplate.replace(`[NUMBER_OF_ADVERTISERS]`, numberOfAdvertisers+1);
  filledTemplate = filledTemplate.replace(`[CAMPAIGN_ID]`,campaignID);
  filledTemplate = filledTemplate.replace(`[CAMPAIGN_ID]`,campaignID);
  filledTemplate = filledTemplate.replace(`[CAMPAIGN_URL]`,campaignUrl);
  filledTemplate = filledTemplate.replace(`[DATE_FRAME]`,dateRange);
  filledTemplate = filledTemplate.replace(`[REWARD]`,reward);
  filledTemplate = filledTemplate.replace(`[REST]`,rest);
  filledTemplate = filledTemplate.replace(`[BUDGET]`,budget);
  filledTemplate = filledTemplate.replace(`[SPONSOR]`,sponsor);
  filledTemplate = filledTemplate.replace(`[ADVERTISING_TEXT]`,advertisingText);
  return filledTemplate;
}

// Filtern der Datensätze basierend auf last_update und unique Authors:
function datefilter(numberOfDays, recordset) {
  console.log("numberOfDays: im dateFilter() = " + numberOfDays)
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - numberOfDays);
  const dateFilteredRecordset = recordset.filter((item) => {
    const lastUpdate = new Date(item.last_update);
    return lastUpdate >= sevenDaysAgo && lastUpdate <= currentDate;
  });
  let uniqueAuthors = [];
  let filteredRecordset = dateFilteredRecordset.filter((item) => {
    if (!uniqueAuthors.includes(item.author)) {
      uniqueAuthors.push(item.author);
      return true;
    }
    return false;
  });
  return filteredRecordset;
}


// URL, Account extrahieren und anhängen:
async function dataExtractAndAppend(dateFilteredRecordset) {
  for (const item of dateFilteredRecordset) {
    item.account = extractAccountFromUrl(item.url);
    item.weburl = modifyUrl(item.url);
    console.log("dataExtractAndAppend - Author der Meldung:", item.author);
    const [firstImageUrl, authorReputation] = await getMetaData.getMetaData(item.url);
    console.log("dataExtractAndAppend - First Image Url:", firstImageUrl);
    item.originAuthorReputation = authorReputation;
    item.firstImageUrl = firstImageUrl
    console.log("dataExtractAndAppend - item", item);
  }
}


// Filtern, dass anobel (und später weitere Peronen) nicht ausgewertet werden
function blackList(blackListedAccount, dateFilteredRecordset) {
  const blacklistFilteredRecordset = dateFilteredRecordset.filter((item) => {
    console.log("Blacklist - item:", item);
    return item.account !== blackListedAccount && !item.url.includes('#@');
  });
  return blacklistFilteredRecordset;
}

// Hauptfunktion
async function main() {
  let {dateFrame} = getDateFrame(startDate, numberOfDays);
  console.log("dateFrame:", dateFrame, "numberOfDays:", numberOfDays);
  const datasource = 'sql'  // 'sql' or 'file'
  let recordset; // Variable initialisieren für die If-Klausel
  try {
    if (datasource == 'sql') {
      // SQL-Skript ausführen - Hier den Suchtext eingeben:
      recordset = await executeSQLScript(advertisingText);
      fs.writeFileSync('exampleRecordSet.json', JSON.stringify(recordset));
    }
    else {
      // Alternativ: JSON-Datei einlesen
      const data = await fs.promises.readFile('exampleRecordSet.json', 'utf8');
      recordset = JSON.parse(data);
    }
    // Datensatz auf dateRange Tage begrenzen
    const dateFilteredRecordset = datefilter(numberOfDays, recordset);
    await dataExtractAndAppend(dateFilteredRecordset);
    // Filtern, dass anobel (und später weitere Peronen) nicht ausgewertet werden
    var blacklistFilteredRecordset = blackList('advertisingbot2', dateFilteredRecordset);
    // Vorlage mit Recordset füllen
    var filledTemplate = await fillTemplate(campaignID, campaignUrl, dateFrame, JSON.stringify(blacklistFilteredRecordset), maxAdvertisers,reward, budget, sponsor);
    fs.writeFileSync('FilledReportTemplate_' + campaignID + '.md', filledTemplate);
    fs.writeFileSync('dateFilteredRecordset.json', JSON.stringify(dateFilteredRecordset));
  } catch (error) {
    console.error(error);
  }
}

main();
