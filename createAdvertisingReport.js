const sql = require('mssql');
const { password1 } = require('./config');
const fs = require('fs');
const { dateFrame } = require('./getDateFrame.js');
const getMetaData = require('./getMetaData');
const { table } = require('console');
const { stringify } = require('querystring');
const getFollower = require('./getFollower.js');
const getDateFrame = require('./getDateFrame.js');
//const getStakedChary = require('./getStakedChary');
//const math = require('math');

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
  try {
    // Verbindung zum SQL Server herstellen
    await sql.connect(config);

    // SQL-Abfrage aus der Datei lesen
    const queryTemplate = fs.readFileSync('HiveSQLQuery.sql', 'utf8');

    // Parameter in der Vorlage ersetzen
    const query = queryTemplate.replace(/!CHARY/g, searchParameter);

    // SQL-Abfrage ausführen
    const result = await sql.query(query);

    // Ergebnis verarbeiten
    console.log(result.recordset);

    // Verbindung schließen
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
async function fillTemplate(dateRange, recordset, maxAdvertisers, HiveAmountPerUser) {
  // Vorlagendatei lesen
  const template = fs.readFileSync('ReportTemplate.md', 'utf8');

  // Recordset nach charyNumber sortieren
  //recordset.sort((a, b) => b.charyNumber - a.charyNumber);

  // Platzhalter ersetzen
  let tableString = '';
  let filledTemplate = template;
  console.log('Filledtemplate = ' + filledTemplate);
  console.log('Recordset = ' + recordset);
  const recordsetObj = JSON.parse(recordset);
  // loop until number of hits or maxAdvertisers is reached
  for (let i = 0; i < Math.min(recordsetObj.length, maxAdvertisers); i++) {
    console.log('Filltemplate RecordsetObj[i]: ' + JSON.stringify(recordsetObj[i]));
    console.log('Author = ' + JSON.stringify(recordsetObj[i].author));
    const author = recordsetObj[i].author //? recordset[i].account : `[AUTHOR${i + 1}]`;
    console.log('author = ', author);
    const NumberOfFollowers = await getFollower(author);
    //filledTemplate = filledTemplate.replace(`[AUTHOR${i + 1}]`, author);
    const weburl = recordsetObj[i].weburl;
    console.log('weburl = ', weburl);
    //filledTemplate = filledTemplate.replace(`[URL${i + 1}]`, weburl);
    const body = JSON.stringify(recordsetObj[i].body);
    // truncate the body to the first 10 words
    stringWithoutCR = body.replace(/\r/g, ''); // remove Carriege Return
    const words = stringWithoutCR.split(' ');
    const truncatedWords = words.slice(0, 10);
    const truncatedBody = truncatedWords.join(' ');
    if (!truncatedBody.endsWith('"')) {
     truncatedBodyWithEnd = truncatedBody+' ..."';
    }
    else {
      truncatedBodyWithEnd = truncatedBody;
    }
    console.log('truncatedBodyWithEnd = ', truncatedBodyWithEnd);
    //filledTemplate = filledTemplate.replace(`[REASON${i + 1}]`, truncatedBodyWithEnd);

    // //const url = "/hive-150210/@alifkhan1995/todays-cleanplanet-activity--day-50---date-22082023-#@alifkhan1995/re-achimmertens-rzu2rc";
    const url = recordsetObj[i].url;
    const [firstImageUrl, authorReputation] = await getMetaData.getMetaData(url);
    //filledTemplate = filledTemplate.replace(`[IMAGE${i + 1}]`, firstImageUrl);
    console.log("authorReputation = ", authorReputation);
    recordset[i].originAuthorReputation = authorReputation;
    //j=i+1;

    
    console.log("NumberOfFollowers = ", NumberOfFollowers);
    lastUpdateTrunc=((JSON.stringify(recordsetObj[i].last_update)).slice(0, -9)).slice(1);
    //tableString=tableString+'|'+j+'|'+HiveAmountPerUser+'|@'+author+'|'+truncatedBodyWithEnd+'|'+url+'|'+firstImageUrl+'|\n';
    tableString=tableString+'|'+lastUpdateTrunc+'|'+HiveAmountPerUser+'|@'+author+'|'+(authorReputation/1000000000).toFixed(2)+'|'+NumberOfFollowers+'|'+truncatedBodyWithEnd+'|'+url+'|'+firstImageUrl+'|\n';
    //|1.|10 Hive|@[AUTHOR1]|[REASON1]|[URL1]|[IMAGE1]|


  }

  // Datum im filledTemplate reinschreiben
  // dateText = dateFrame(dateRange);
  // filledTemplate = filledTemplate.replace(`[DATE_FRAME]`, dateText)

  filledTemplate = filledTemplate.replace(`[TABLE]`, tableString);
  return filledTemplate;
}

// Filtern der Datensätze basierend auf last_update:
function datefilter(dateRange, recordset) {
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - dateRange);

  const dateFilteredRecordset = recordset.filter((item) => {
    const lastUpdate = new Date(item.last_update);
    return lastUpdate >= sevenDaysAgo && lastUpdate <= currentDate;
  });
  return dateFilteredRecordset;
}

async function calculateCharyScore(charyNumber, stakedChary, authorReputation) {
  charyNumberMax = 10
  if (charyNumber > charyNumberMax) { charyNumber = charyNumberMax }
  authorReputationMax = 15; //10^15
  authorReputationLog = Math.log10(authorReputation);
  if (authorReputationLog > authorReputationMax) { authorReputationLog = authorReputationMax }
  stakedCharyMax = 100000
  if (stakedChary > stakedCharyMax) { stakedChary = stakedCharyMax }
  charyNumberPart = charyNumber / charyNumberMax;
  stakedCharyPart = stakedChary / stakedCharyMax;
  authorReputationPart = authorReputationLog / authorReputationMax;
  console.log("charyNumber = ", charyNumber, ", authorReputation = ", authorReputationLog, ", stakedChary = ", stakedChary);
  console.log("charyNumberPart = ", charyNumberPart, ", authorReputationPart = ", authorReputationPart, ", stakeCharyPart = ", stakedCharyPart);
  charyScore = 7 * charyNumberPart + 2 * authorReputationPart + 1 * stakedCharyPart;
  console.log("charyScore = ", charyScore)
  return charyScore.toFixed(3);
}

// URL, Account und CharyNumber extrahieren und anhängen:
async function dataExtractAndAppend(dateFilteredRecordset) {
  for (const item of dateFilteredRecordset) {
    //item.charyNumber = extractNumberFromChary(item.body);
    item.account = extractAccountFromUrl(item.url);
    item.weburl = modifyUrl(item.url);
    console.log("dataExtractAndAppend - Author der Meldung:", item.author);
    //item.stakedChary = await getStakedChary(item.author)
    const [firstImageUrl, authorReputation] = await getMetaData.getMetaData(item.url);
    //if (!firstImageUrl) return "";
    console.log("dataExtractAndAppend - First Image Url:", firstImageUrl);
    item.originAuthorReputation = authorReputation;
    item.firstImageUrl = firstImageUrl
    //item.charyScore = await calculateCharyScore(item.charyNumber, item.stakedChary, authorReputation);
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
  //const dateRange = 7 // Number of days, that we want to observe in the dataset
  let {dateFrame, currentDateString, oneWeekAgoString, timeFrame} = getDateFrame();
  const datasource = 'sql'  // 'sql' or 'file'
  let recordset; // Variable initialisieren für die If-Klausel
  const budget = 20 // Max number of Hive, that the sponsor is willing to give
  const reward = 2 // Amount of Hive for each unique advertiser
  const maxAdvertisers = budget/reward
  const advertisingText = 'follow @fjworld and visit https://epaytraffic.com/'

  try {
    if (datasource == 'sql') {
      // SQL-Skript ausführen - Hier den Suchtext eingeben:
      recordset = await executeSQLScript("subscribe the community Hive Marketing");
      fs.writeFileSync('exampleRecordSet.json', JSON.stringify(recordset));
    }
    else {
      // Alternativ: JSON-Datei einlesen
      const data = await fs.promises.readFile('exampleRecordSet.json', 'utf8');
      recordset = JSON.parse(data);
    }

    // Datensatz auf dateRange Tage begrenzen
    const dateFilteredRecordset = datefilter(timeFrame, recordset);

    // URL, Account und CharyNumber extrahieren und anhängen:
    await dataExtractAndAppend(dateFilteredRecordset);

    // Filtern, dass anobel (und später weitere Peronen) nicht ausgewertet werden
    var blacklistFilteredRecordset = blackList('advertisingbot2', dateFilteredRecordset);

    // Recordset nach charyNumber sortieren
    //    blacklistFilteredRecordset.sort((a, b) => b.charyScore - a.charyScore);

    // Vorlage mit Recordset füllen
    var filledTemplate = await fillTemplate(timeFrame, JSON.stringify(blacklistFilteredRecordset), 10,1);

    //   console.log('Der BlacklistedRecordSet sieht so aus: ', JSON.stringify(blacklistFilteredRecordset));
    //   console.log('Das FilledTemplate sieht so aus: ', filledTemplate);

    //  fs.writeFileSync('changedRecordSet.json', JSON.stringify(blacklistFilteredRecordset));
    // Aktualisierte Vorlage in eine neue Datei schreiben
    fs.writeFileSync('FilledReportTemplate.md', filledTemplate);

    //fs.writeFileSync('dateFilteredRecordset.json',dateFilteredRecordset);
    fs.writeFileSync('dateFilteredRecordset.json', JSON.stringify(dateFilteredRecordset));


  } catch (error) {
    console.error(error);
  }
}

// Hauptfunktion aufrufen
main();
