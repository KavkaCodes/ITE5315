const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function findAll() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true })
            .then(client => {
                console.log('1');
                const db = client.db("mydb");
                console.log('2')
                let collection = db.collection('customers');
                console.log('3');
                let cursor = collection.find({}).limit(10);
                console.log('4');
                cursor.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            })
            .catch(err => {
                reject(err);
            });
    });
}

setTimeout(() => {
    findAll()
        .then(docs => {
            console.log(docs);
        })
        .catch(err => {
            console.error(err);
        });
    console.log('iter');
}, 5000);
