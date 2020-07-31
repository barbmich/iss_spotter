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

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
  // success, print out the deets!
});