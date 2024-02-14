const fs = require("fs");

fs.readFile(
    __dirname+"/foo/credential",
    "utf8",
   (err, data) => {
     if (err) throw err;
     console.log(data);
   }
);
