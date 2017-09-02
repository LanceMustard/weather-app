var request = require('request');

var requestOptions = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
  json: true
}

const openGoogleAPI = (options) => {
  request(options, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', JSON.stringify(body, undefined, 2));
  });
}

openGoogleAPI(requestOptions);
