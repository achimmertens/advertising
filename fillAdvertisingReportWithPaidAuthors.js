const fs = require('fs');
if (process.argv.length < 3) {
  console.log("Please add a config file.");
  process.exit(1);
}
const campaignConfig = require('./' + process.argv[2]);
const campaignID = campaignConfig.campaignID;
let report = fs.readFileSync('./campaigns/Report_' + campaignID + '.md', 'utf8');
const authorsPaid =  fs.readFileSync('authorsPaid_' + campaignID + '.json', 'utf8');

report = report.replace(`[IMAGE_SEND_MONEY]`, authorsPaid);

console.log(report);
fs.writeFileSync('./campaigns/Report_' + campaignID + '.md', report);