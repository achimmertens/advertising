
module.exports = function getDateFrame(startDate, numberOfDays) {

console.log("Here in getDateFrame() is numberOfDays = ",numberOfDays," and startDate = ",startDate);
let endDate=new Date(startDate);
endDate.setDate(new Date(startDate).getDate()+Number(numberOfDays));
console.log("endDate = ",endDate);
let startDateString = startDate+"T05:30:00.000Z";
let endDateString = endDate.toISOString().slice(0, 10)+"T05:30:00.000Z";
let dateFrame = `${startDateString.slice(0, 10)} to ${endDateString.slice(0, 10)}`;
console.log("dateFrame = ",dateFrame);
return {dateFrame, endDateString, startDateString};
}