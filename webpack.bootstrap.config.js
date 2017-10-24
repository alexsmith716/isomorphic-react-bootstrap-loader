
const fs = require('fs');

// function getBootstraprcCustomLocation() {
//   return process.env.BOOTSTRAPRC_LOCATION;
// }

const bootstraprcCustomLocation = process.env.BOOTSTRAPRC_LOCATION;
// const bootstraprcCustomLocation = getBootstraprcCustomLocation();

console.log('Using the bootstrap-loader bootstraprcCustomLocation: ', bootstraprcCustomLocation);

let defaultBootstraprcFileExists;

try {
  fs.statSync('./.bootstraprc');
  defaultBootstraprcFileExists = true;
} catch (e) {
  defaultBootstraprcFileExists = false;
}

console.log('Using the bootstrap-loader defaultBootstraprcFileExists: ', defaultBootstraprcFileExists);

if (!bootstraprcCustomLocation && !defaultBootstraprcFileExists) {
  console.log('You did not specify a \'bootstraprc-location\' ' + 'arg or a ./.boostraprc file in the root.');
  console.log('Using the bootstrap-loader default configuration.');
}

let bootstrapDevEntryPoint;
let bootstrapProdEntryPoint;

if (bootstraprcCustomLocation) {
  bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' + `configFilePath=${__dirname}/${bootstraprcCustomLocation}` + '!bootstrap-loader/no-op.js';
} else {
  bootstrapDevEntryPoint = 'bootstrap-loader';
}

if (bootstraprcCustomLocation) {
  bootstrapProdEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?extractStyles' + `&configFilePath=${__dirname}/${bootstraprcCustomLocation}` + '!bootstrap-loader/no-op.js';
} else {
  bootstrapProdEntryPoint = 'bootstrap-loader/extractStyles';
}

module.exports = {
  dev: bootstrapDevEntryPoint,
  prod: bootstrapProdEntryPoint,
};
