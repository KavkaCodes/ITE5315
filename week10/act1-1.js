const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, client) {
   if (err) throw err;
   const db = client.db("Company");
   db.collection("customers").findOne({}, function(err, result) {
     if (err) throw err;
     console.log(result.first_name);
     client.close();
   });
});