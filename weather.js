const request = require('request');

const forecast = (lat, lng) => {
  return new Promise((resolve, reject) => {
    var options = {
      url: `https://api.darksky.net/forecast/7ff9d2532dd3307487c517ce612aada4/${lat},${lng}`,
      json: true
    };

    request(options, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Dark Sky API');
      } else if (body.error) {
        reject(body.error);
      } else {
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    });
  });
};

module.exports = {
  forecast
};