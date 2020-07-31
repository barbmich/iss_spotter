const request = require("request");


const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    return callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    return callback(null, data);
  })
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, data) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS coordinates. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }
    let relevantInfo = JSON.parse(data);
    return callback(null, relevantInfo.response)
  })
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };