const request = require('request');

const geocodeAddress = (address, callback) => {
  var uri = encodeURIComponent(address);

  var options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${uri}`,
    json: true
  };

  request(options, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    } else {
      console.log('Unknown error occured');
    }
  });
};

module.exports = {
  geocodeAddress
};