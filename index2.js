const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function (passTimes) {
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
/*
fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));
    nextISSTimesForMyLocation)
  .then(body => console.log(body)) */ // error here, why? -> solved, was missing resolve in fetchISSFlyOverTimes function

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  // .catch((error) => {
  //   console.log("It didn't work :( : ", error.message);
  // })