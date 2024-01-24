const http = require('http') 
const fs = require("fs");
const server = http.createServer((req,res) => {
    if(req.url === '/'){
        // async
        fs.readFile('MOCK_DATA.json', function (err, data) {
            if (err) {
                console.error(err);
                return;
            }
            let dataParse = JSON.parse(data);
            console.log(dataParse);
            dataParse.forEach(element => {
                res.write(`<p>${element.first_name}</p>`)
                
            });
            res.end();
        });
        res.write("<h1>Program Ended</h1>");
        // if response is ended here it wont execute the res.write() in the callback 
        // res.end()
    }
    if(req.url === '/sync'){
        // sync
        let data = fs.readFileSync('MOCK_DATA.json');
        let dataParse = JSON.parse(data);
        console.log(dataParse);
        dataParse.forEach(element => {
            res.write(`<p>${element.first_name}</p>`)
        });
        res.end()
    }
    if(req.url === '/require'){
        const jsonData = require("./MOCK_DATA.json")
        jsonData.forEach(element => {
            res.write(`<p>${element.email}</p>`)
            
        });
        res.write("Program Ended");
    }
});
server.listen(3000);
console.log('Listening to on port 3000')
