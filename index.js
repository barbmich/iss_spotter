const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const myIP = "107.159.37.8"
const coordinates = { latitude: "45.51830", longitude: "-73.50230" };

fetchMyIP((error, ip) => {
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
});