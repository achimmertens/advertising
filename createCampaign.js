const fs = require('fs');
const config = require('./campaignConfig_4701.json');
const budget = config.budget; // Hive
const reward = config.reward; // Hive per participant
const maxAdvertisers = budget/reward;
const advertisingText = config.advertisingText;
const sponsor = config.sponsor;
let today = new Date();
let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Heutiges Datum plus 7 Tage in Millisekunden
let formattedToday = today.toISOString().split('T')[0]; // Formatierung des heutigen Datums
let formattedNextWeek = nextWeek.toISOString().split('T')[0]; // Formatierung des Datums in einer Woche
let formattedNextPeriod = formattedToday + ' to ' + formattedNextWeek; // Zusammenführen der formatierten Daten
console.log('Nächste Periode: ',formattedNextPeriod); 


function getCurrentWeek() {
    let today = new Date();
    let firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    let pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }


async function fillTemplate(dateFrame, currentWeek, sponsor, advertisingText, maxAdvertisers, reward) {
    // Vorlagendatei lesen
    const template = fs.readFileSync('campaignTemplate.md', 'utf8');
    let filledTemplate = template;
    filledTemplate = filledTemplate.replace(`[CURRENT_WEEK]`, currentWeek);
    filledTemplate = filledTemplate.replace(`[CURRENT_WEEK]`, currentWeek); // for each field once
    filledTemplate = filledTemplate.replace(`[DATE_FRAME]`, dateFrame);
    filledTemplate = filledTemplate.replace(`[SPONSOR]`, sponsor);
    console.log("Sponsor = ",sponsor);
    filledTemplate = filledTemplate.replace(`[ADVERTISING_TEXT]`, advertisingText);
    console.log("Advertising Text = ", advertisingText);
    filledTemplate = filledTemplate.replace(`[MAX_ADVERTISERS]`, maxAdvertisers);
    console.log("Number of max. Advertisers = ", maxAdvertisers);
    filledTemplate = filledTemplate.replace(`[REWARD]`, reward);
    console.log("Reward per member = ", reward);
    return filledTemplate;
}

async function main () {
    let currentWeek = getCurrentWeek();
    console.log("Die aktuelle Kalenderwoche ist: " + currentWeek);
    try {
        var filledTemplate = await fillTemplate(formattedNextPeriod, currentWeek, sponsor, advertisingText, maxAdvertisers, reward);
        fs.writeFileSync('FilledCampaignTemplate.md', filledTemplate);
}   catch (error) {
        console.error(error);
  }
}

main ();