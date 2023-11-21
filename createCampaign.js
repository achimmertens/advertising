const fs = require('fs');
const getDateFrame = require('./getDateFrame.js');
const budget = 20 // Hive
const reward = 2 // Hive per participant
const maxAdvertisers = budget/reward
const advertisingText = 'follow @fjworld and visit https://epaytraffic.com/'
const sponsor = '@achimmertens';
let {dateFrame, currentDateString, oneWeekAgoString, timeFrame} = getDateFrame();


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
        var filledTemplate = await fillTemplate(dateFrame, currentWeek, sponsor, advertisingText, maxAdvertisers, reward);
        fs.writeFileSync('FilledCampaignTemplate.md', filledTemplate);
}   catch (error) {
        console.error(error);
  }
}

main ();