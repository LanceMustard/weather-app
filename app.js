const yargs = require('yargs');
// const geocode = require('./geocode.js'); 
// const weather = require('./weather.js');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// Using Axios which uses promise
axios
  .get(geocodeUrl)
  .then((geocodeResponse) => {
    if (geocodeResponse.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }
    var formattedAddress = geocodeResponse.data.results[0].formatted_address;
    var lat = geocodeResponse.data.results[0].geometry.location.lat;
    var lng = geocodeResponse.data.results[0].geometry.location.lng;
    console.log('Checking the weather for', formattedAddress);
    var weatherUrl = `https://api.darksky.net/forecast/7ff9d2532dd3307487c517ce612aada4/${lat},${lng}`;
    return axios.get(weatherUrl);
  })
  .then((weatherResponse) => {
    var temperature = weatherResponse.data.currently.temperature;
    var apparentTemperature = weatherResponse.data.currently.apparentTemperature;
    console.log(`Current temperature is ${temperature}`);
    console.log(`Feels like ${apparentTemperature}`);
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(error.message);
    }
  });

// !@# using Callbacks (and one home made promise)
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {   if
// (errorMessage) {     console.log(errorMessage);   } else {
// console.log(`Checking the weather for ${results.address}`);
// weather.forecast(results.lat, results.lng)       .then((result) => {
// console.log(`Current temperature is ${result.temperature}`);
// console.log(`Feels like ${result.apparentTemperature}`);       })
// .catch((errorMessage) => {         console.log(errorMessage);       });   }
// });