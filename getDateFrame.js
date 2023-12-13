
module.exports = function getDateFrame(startDate, timeFrame) {

//let timeFrame = 21;  // Number of Days in the past
console.log("timeFrame = ",timeFrame," , startDate = ",startDate);
//let endDate = new Date(startDate+"T05:30:00.000Z")// + timeFrame*24*60*60*1000;
let endDate=new Date();
endDate.setDate(new Date(startDate).getDate()+Number(timeFrame));
console.log("endDate = ",endDate);
// let formattedEndDate = endDate.toISOString() //.split('T')[0];
// console.log(formattedEndDate); // Output: 2023-12-11

//let timeFrame = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds


// Format the endDate to "YYYY-MM-DD"
let formattedEndDate = endDate.toISOString().split('T')[0];
console.log("formattedEndDate = ",formattedEndDate); // Output: 2023-12-11

//let oneWeekAgo = new Date();
//let currentDate = new Date();
// let currentDateString = currentDate.toISOString().slice(0, 10)+"T05:30:00.000Z";
let startDateString = startDate+"T05:30:00.000Z";
//oneWeekAgo.setDate(oneWeekAgo.getDate() - timeFrame);

let endDateString = endDate.toISOString().slice(0, 10)+"T05:30:00.000Z";
// Bei Bedarf überschreiben:
//oneWeekAgoString = '2023-05-09T07:30:08.988Z'
//currentDateString = '2023-05-16T07:30:08.988Z'
let dateFrame = `${startDateString.slice(0, 10)} to ${endDateString.slice(0, 10)}`;
console.log("dateFrame = ",dateFrame);
return {dateFrame, endDateString, startDateString, timeFrame};
}