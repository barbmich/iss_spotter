const { /* fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, */ nextISSTimesForMyLocation } = require('./iss');
// const myIP = "107.159.37.8"
// const coordinates = { latitude: "45.51830", longitude: "-73.50230" };

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP(myIP, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(`It worked! The coordinates are latitude: ${data.data.latitude}, longitude: ${data.data.longitude}`);
});

fetchISSFlyOverTimes(coordinates, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Next flybys:', data);
}); */

// this function, based on passTimes, prints to the console a user-friendly list of ISS passes to their location 
const printPassTimes = function(passTimes) {
  // for loop that iterates through the list of passes
  for (const pass of passTimes) {
    // new Date creates a date object. not sure why the 0, as it creates date Jan 1st 1970
    const datetime = new Date(0);
    // 
    datetime.setSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// main function, that makes everything work! it receives passTimes and with that, through printPassTimes, it outputs the results we've been looking for
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
  // success, print out the deets!
});