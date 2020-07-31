const request = require("request");

/* we can handle errors the same way for all 3 functions:
if (error) {
  return callback(error, null);
}
if (response.statusCode !== 200) {
  const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
  callback(Error(msg), null);
  return;
}
*/

const fetchMyIP = function(callback) {
  // we request our ip from ipify: 
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    // we parse the body.ip key, to obtain specifically what's needed
    const ip = JSON.parse(body).ip;
    // we send ip info through callback to the following function
    return callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  // now that we have our ip, we obtain our location:
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // declare an object with latitude and longitude through parsing body.data
    const { latitude, longitude } = JSON.parse(body).data;
    // we send coordinates info through callback to the following function
    return callback(null, { latitude, longitude });
  })
};

const fetchISSFlyOverTimes = function(coords, callback) {
  // now that we have our location, we obtain when the iss passes through our location
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // declare an array that lists the next 5 times the iss is above us 
    const passes = JSON.parse(body).response;
    return callback(null, passes)
  })
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null)
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { /* fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, */ nextISSTimesForMyLocation };