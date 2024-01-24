const fs = require('fs');
let myData = fs.readFileSync('jsonData.json');
let contacts = JSON.parse(myData);F
console.log(contacts);