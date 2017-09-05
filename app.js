const yargs = require('yargs');
const geocode = require('./geocode.js');
const weather = require('./weather.js');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(`Checking the weather for ${results.address}`);
    weather.forecast(results.lat, results.lng)
      .then((result) => {
        console.log(`Current temperature is ${result.temperature}`);
        console.log(`Feels like ${result.apparentTemperature}`);
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  }
});