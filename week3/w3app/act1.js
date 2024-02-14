const express = require('express')
const http = require("http");
const path = require("path");
const fs = require("fs");

const app = express()
const port = 3000

// Activity 3
app.get('/api/emps/', (req,res) => {
    res.send([1,2,3]);
})
app.get('/api/emps/:id' , (req,res) =>{
    console.log(req.params);
    // res.send(req.params.id);
    res.send(req.params.id)
})
app.get('/api/posts/:month/:day', (req,res) =>{
    console.log(req.params);
    res.send(req.params);
})


app.get('/api/post', (req,res) =>{
    // console.log(req.params);
    res.send(req.query);
})


app.get('/', (req, res) => {
    // ACTIVITY 2
    res.sendFile(path.join(__dirname, "public", "index.html"))

    // console.log(req.url)
    // let filePath = path.join(
    //     __dirname,
    //     'public',
    //     req.url === '/' ? 'index.html' : req.url
    // ) 

    // fs.readFile(filePath, (err, content) => {
    //     if (err) {
    //         // response.writeHead(404, {'Content-Type' : 'text/html'});
    //         res.end(err.message)
    //     } else {
    //         // response.writeHead(200, {'Content-Type' : 'text/html'});
    //         res.end(content)
    //     }
    // })
})

app.get('/sum', (req, res) => {
    // res.writeHead(200, {'Content-Type' : 'application/json'})

    nums = [1, 2, 3, 4]
    sum = 0

    nums.forEach(num => {
        console.log(num)
        sum += num
    });
    console.log(sum)
    res.send((JSON.stringify(sum)))
})

app.get('/node', (req, res) => {
    // res.writeHead(200, {'Content-Type' : 'application/json'})
    var one = 1
    var two = 2
// Swap values
    var [one, two] = [two, one]
    console.log(`One: ${one}, Two: ${two}`)
    res.end("Success")
})


app.put('/update', function (req, res) {
    console.log("Updated");
    res.send("Updated");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})