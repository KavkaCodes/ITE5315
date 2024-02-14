/*********************************************************************************
  * ITE5315 – Assignment 1 * 
  * I declare that this assignment is my own work in accordance with Humber Academic Policy. * 
  * No part of this assignment has been copied manually or electronically from any other source *
  *  (including web sites) or distributed to other students.*
  * 
  *  Name: Sumedh Udar Student ID: N01580256 Date: Feb 6, 2024 *
  * 
  * 
  **********************************************************************************/

const express = require('express')
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = express()
const port = 5500

app.use(express.urlencoded({ extended: true }));

var data, dataParse 

function readJsonFile() {
    data = fs.readFile('./datasetA.json')
    dataParse = JSON.parse(data);
}

// Step 2
app.get('/', (req,res)=>{
    res.send("My name is Sumedh Udar and my student id is N01580256")
})

// Step 4
app.get('/data', (req,res)=>{
    readJsonFile();
    console.log(dataParse);
    console.log("JSON data is loaded and ready!");
    res.send("JSON data is loaded and ready!")
})

// Step 5
app.get('/data/isbn/:index', (req,res)=>{
    readJsonFile()
    // if (req.params.index === parseInt(req.params.index, 10)) {
        
    // } else{
        // res.send("Error: incorrect index")
    // }
    const index = req.params.index;
    const bookIndex = parseInt(index);
    if (!isNaN(bookIndex) && bookIndex >= 0 ) {
        res.send(dataParse[req.params.index].ISBN_13);
    } else {
        res.status(404).json({ error: 'Invalid index or book not found' });
    }
    
})

// Step 6
app.get('/data/search/isbn', (req,res)=>{
    res.send(`<form method="POST" action="/" id="searchForm" >
    <input type="text" name="ISBN" id="ISBN" placeholder="Enter ISBN">
    <input type="submit" value="Search">
</form>`)
    // res.sendFile(path.join(__dirname, "search.html"))
})

app.post('/', (req,res)=>{
    readJsonFile();
    dataParse.forEach(book => {
        console.log(book);
        if(req.body.ISBN == book.ISBN_13){
            res.send(`
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            <p><strong>Price (including used books):</strong> $${book.priceIncludingUsedBooks}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Average Reviews:</strong> ${book.avgReviews}</p>
            <p><strong>Number of Reviews:</strong> ${book.nReviews}</p>
            <p><strong>Star:</strong> ${book.star}</p>
            <p><strong>Dimensions:</strong> ${book.dimensions}</p>
            <p><strong>Weight:</strong> ${book.weight}</p>
            <p><strong>Language:</strong> ${book.language}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p><strong>ISBN-13:</strong> ${book.ISBN_13}</p>
        `)
        } 
    });
    res.send("No book with matching IBSN")
})

// Step 7
app.get('/data/search/title', (req,res)=>{
    res.send(`<form method="POST" action="/title" id="searchForm" >
    <input type="text" name="bookTitle" id="book" placeholder="Enter Book Title">
    <input type="submit" value="Search">
</form>`)
    // res.sendFile(path.join(__dirname, "search.html"))
})

app.post('/title', (req,res)=>{
    if(req.body.bookTitle == ""){
        res.send("No book with matching Title" )
    }
    var bookhtml = ``;
    readJsonFile();
    dataParse.forEach(book => {
        // console.log(book.title);
        if(book.title.includes(req.body.bookTitle)){
            console.log(book.title);
            bookhtml += `<p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            <p><strong>Price (including used books):</strong> $${book.priceIncludingUsedBooks}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Average Reviews:</strong> ${book.avgReviews}</p>
            <p><strong>Number of Reviews:</strong> ${book.nReviews}</p>
            <p><strong>Star:</strong> ${book.star}</p>
            <p><strong>Dimensions:</strong> ${book.dimensions}</p>
            <p><strong>Weight:</strong> ${book.weight}</p>
            <p><strong>Language:</strong> ${book.language}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p><strong>ISBN-13:</strong> ${book.ISBN_13}</p>`
            
        }
    });
    if (bookhtml != ``) {
        res.send(bookhtml)
    }
    res.send("No book with matching Title")
})

// Step 3
app.get('*', (req,res,next) => {
    res.send("Error 404: Not Found")
})

app.listen(port, () => {
})

// Req.query
// Pros:

// Flexibility: Users can input search criteria directly in the URL.
// Easily handle optional parameters: Query parameters are optional by nature, making it convenient for implementing search filters.
// Simple syntax: Accessing query parameters is straightforward using req.query.
// Cons:

// Security concerns: Query parameters are visible in the URL, which could potentially expose sensitive information.
// URL length limitations: URLs have a maximum length, which could restrict the amount of data that can be passed in the query parameters.
// Req.params
// Pros:

// Cleaner URLs: Parameters are part of the URL path, making it cleaner and potentially more user-friendly.
// Better for strict routing: Useful when the search criteria are essential parts of the URL structure.
// Cons:

// Limited to route parameters: Only works when the search criteria are part of the URL path, which might not always be the case.
// Less flexible: Not as flexible as query parameters for handling optional search criteria.