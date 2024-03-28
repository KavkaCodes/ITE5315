const fs = require("fs");

console.time('one');
console.time('two');
fs.readFile( "./datasetA.json", function (err, data) {
  if (err) cb( err );
  console.timeEnd('one');
});
var data = fs.readFileSync("./datasetA.json" );
console.timeEnd('two');