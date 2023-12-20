const fs = require('fs');
if (process.argv.length < 3) {
  console.log("Please add a config file.");
  process.exit(1);
}
const campaignConfig = require('./' + process.argv[2]);


const { privateKey } = require('./config');

const hive = require('@hiveio/hive-js');