const data = require('./people');
const os = require('os');

console.log(data.people);
console.log(data.newAges);

console.log(os.platform(), os.homedir());