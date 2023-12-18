const fs = require('fs');
const config = require('./' + process.argv[2]);
const getDateFrame = require('./getDateFrame.js');

const budget = config.budget; // Hive
console.log("Budget: " + budget);
const reward = config.reward; // Hive per participant
const maxAdvertisers = budget/reward;
const advertisingText = config.advertisingText;
const optionalText = config.optionalText;
const recipient = config.recipient;
const sponsor = config.sponsor;
const numberOfDays = config.numberOfDays;
const startDate = config.startDate;
const campaignId = config.campaignID;
const lastweek = config.lastWeek;
const lastCampaigns = config.lastCampaigns;
const tags = config.tags;
// let today = new Date();
// let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Heutiges Datum plus 7 Tage in Millisekunden
// let formattedToday = today.toISOString().split('T')[0]; // Formatierung des heutigen Datums
// let formattedNextWeek = nextWeek.toISOString().split('T')[0]; // Formatierung des Datums in einer Woche
// let formattedNextPeriod = formattedToday + ' to ' + formattedNextWeek; // Zusammenführen der formatierten Daten
// console.log('Nächste Periode: ',formattedNextPeriod); 

// Kalenderwoche
function getCurrentWeek() {
    let today = new Date();
    let firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    let pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }


async function fillTemplate(campaignId, dateFrame, currentWeek, sponsor, recipient, advertisingText, optionalText, maxAdvertisers, reward, lastCampaigns, tags) {
    // Vorlagendatei lesen
    const template = fs.readFileSync('campaignTemplate.md', 'utf8');
    let filledTemplate = template;
    filledTemplate = filledTemplate.replace(`[CAMPAIGN_ID]`, campaignId);
    filledTemplate = filledTemplate.replace(`[CURRENT_WEEK]`, currentWeek); // for each field once
    filledTemplate = filledTemplate.replace(`[CURRENT_WEEK]`, currentWeek); // for each field once
    filledTemplate = filledTemplate.replace(`[DATE_FRAME]`, dateFrame);
    filledTemplate = filledTemplate.replace(`[RECIPIENT]`, recipient);
    console.log("Recipient = ",recipient);
    filledTemplate = filledTemplate.replace(`[SPONSOR]`, sponsor);
    console.log("Sponsor = ",sponsor);
    filledTemplate = filledTemplate.replace(`[ADVERTISING_TEXT]`, advertisingText);
    console.log("Optional Text = ", optionalText);
    filledTemplate = filledTemplate.replace(`[OPTIONAL_TEXT]`, optionalText);
    console.log("Advertising Text = ", advertisingText);
    filledTemplate = filledTemplate.replace(`[MAX_ADVERTISERS]`, maxAdvertisers);
    console.log("Number of max. Advertisers = ", maxAdvertisers);
    filledTemplate = filledTemplate.replace(`[REWARD]`, reward);
    console.log("Reward per member = ", reward);
    filledTemplate = filledTemplate.replace(`[LAST_WEEK]`, lastweek);
    console.log("Status of the last week = ", lastweek);
    filledTemplate = filledTemplate.replace(`[LAST_CAMPAIGNS]`, lastCampaigns);
    console.log("last Campaigns = ", lastCampaigns);
    filledTemplate = filledTemplate.replace(`[TAGS]`, tags);
    console.log("Tags = ", tags);
    return filledTemplate;
}

async function main () {

  const {dateFrame, endDateString, startDateString} = getDateFrame(startDate, numberOfDays);
    let currentWeek = getCurrentWeek();
    console.log("Die aktuelle Kalenderwoche ist: " + currentWeek);
    try {
        var filledTemplate = await fillTemplate(campaignId, dateFrame, currentWeek, sponsor, recipient, advertisingText, optionalText, maxAdvertisers, reward, lastCampaigns, tags);
        fs.writeFileSync('FilledCampaignTemplate'+ campaignId + '.md', filledTemplate);
}   catch (error) {
        console.error(error);
  }
}

main ();