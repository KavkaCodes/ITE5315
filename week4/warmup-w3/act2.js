const express = require('express');
const { default: next } = require('next');
const app = express()

app.use((req,res,next) => {
    console.log("Time:", Date.now());
    next();
});

app.get('/', (req, res, next) => {
    res.send("Hello World");
});

app.get('/test', (req, res, next) => {
    res.send("Testing");
});

app.get('*', (req,res,next) => {
    res.send("Error 404: Not Found")
})

/** Run the app */
app.listen(3000);