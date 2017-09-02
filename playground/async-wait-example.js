var request = require('request-promise');

var requestOptions = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
  json: true
}

const openGoogleAPI = async (options) => {
  try {
    var response = await request(options);
    console.log('results:', JSON.stringify(response));
  } catch (err) {
    console.log('error:', err);
  }
};

openGoogleAPI(requestOptions);
