const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const myIP = "107.159.37.8"


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP((error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Next flybys:' , data);
})


// fetchCoordsByIP(myIP, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   let body = JSON.parse(data)
//   console.log(`It worked! The coordinates are latitude: ${body.data.latitude}, longitude: ${body.data.longitude}`);
// })