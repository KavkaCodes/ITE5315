const fs = require("fs");
console.time('two')
var data = fs.readFileSync("./datasetA.json" );
console.timeEnd('two');