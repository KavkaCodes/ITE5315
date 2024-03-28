/*********************************************************************************
 * ITE5315 – Assignment 4* I declare that this assignment is my own work in accordance with Humber Academic Policy.* 
 * No part of this assignment has been copied manually or electronically from any other source*
 * (including web sites) or distributed to other students.*
 * Name: Sumedh Udar Student ID: N01580256  Date: Mar 26, 2024 *
 *********************************************************************************/
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
 
var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Employee = require('./models/employee');
var Books = require('./models/book')
 
app.engine('.hbs', exphbs.engine(
    { 
        extname: '.hbs', 
        helpers: {
            checkavg: function (data) {
                if(data == ""){
                    return('<td style=\"color: red;\">N/A</td>')
                } else{
                    return('<td>' + data + '</td>');
                }
            },

            checkData: function (itemdata) {
              if(itemdata.n_reviews == ""){
                return('<tr style=\"background-color: red\"><td>' + itemdata.title + '</td><td>'  + itemdata.author + '</td><td>' + itemdata.price +
                 '</td><td>N/A</td></tr>')
              } else{
                return('<tr><td>' + itemdata.title + '</td><td>'  + itemdata.author + '</td><td>' + itemdata.price +
                '</td><td>'+ itemdata.n_reviews +'</td></tr>')
              } 
            },
        },
    },
));

app.set('view engine', 'hbs');
 
//get all employee data from db
app.get('/api/employees', function(req, res) {
	// use mongoose to get all todos in the database
	Employee.find(function(err, employees) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(employees); // return all employees in JSON format
	});
});

//get all books data from db
app.get('/api/books', function(req, res) {
	// use mongoose to get all todos in the database
	Books.find(function(err, books) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		// res.json(books); // return all books in JSON format
        res.render('allData', {data: books});
	});

});

// get a employee with ID of 1
app.get('/api/employees/:employee_id', function(req, res) {
	let id = req.params.employee_id;
	Employee.findById(id, function(err, employee) {
		if (err)
			res.send(err)
 
		res.json(employee);
	});
 
});


// get a books with id of 1
app.get('/api/books/:book_id', function(req, res) {
	let id = req.params.book_id;
	Books.findById(id, function(err, books) {
		if (err)
			res.send(err)
 
		res.json(books);
	});

});

// get a books with ISBN of 1
app.get('/api/books/isbn/:ISBN_13', function(req, res) {
	let isbn = req.params.ISBN_13;
	Books.find({ISBN_13: isbn}, function(err, books) {
		if (err)
			res.send(err)
 
		res.json(books);
	});
 
});

// create employee and send back all employees after creation
app.post('/api/employees', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	Employee.create({
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
	}, function(err, employee) {
		if (err)
			res.send(err);
 
		// get and return all the employees after newly created employe record
		Employee.find(function(err, employees) {
			if (err)
				res.send(err)
			res.json(employees);
		});
	});
 
});


// create book and send back all books after creation
app.post('/api/books', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	Books.create({
		title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        priceIncludingUsedBooks: req.body.priceIncludingUsedBooks,
        pages: req.body.pages,
        a_reviews: req.body.averageReviews,
        n_reviews: req.body.numberOfReviews,
        star: req.body.starRating,
        dimensions: req.body.dimensions,
        weight: req.body.weight,
        language: req.body.language,
        publisher: req.body.publisher,
        ISBN_13: req.body.ISBN13,
        complete_link: req.body.completeLink
	}, function(err, books) {
		if (err)
			res.send(err);
 
		// get and return all the books after newly created book record
		Books.find({ISBN_13: req.body.ISBN13}, function(err, books) {
			if (err)
				res.send(err)
			res.json(books.author);
		});
	});
 
});

// create employee and send back all employees after creation
app.put('/api/employees/:employee_id', function(req, res) {
	// create mongose method to update an existing record into collection
    console.log(req.body);

	let id = req.params.employee_id;
	var data = {
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
	}

	// save the user
	Employee.findByIdAndUpdate(id, data, function(err, employee) {
	if (err) throw err;

	res.send('Successfully! Employee updated - '+employee.name);
	});
});

// create book and send back all books after creation
app.put('/api/books/:book_id', function(req, res) {
	// create mongose method to update an existing record into collection
    console.log(req.body);

	let id = req.params.book_id;
	var data = {
		title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        priceIncludingUsedBooks: req.body.priceIncludingUsedBooks,
        pages: req.body.pages,
        a_reviews: req.body.averageReviews,
        n_reviews: req.body.numberOfReviews,
        star: req.body.starRating,
        dimensions: req.body.dimensions,
        weight: req.body.weight,
        language: req.body.language,
        publisher: req.body.publisher,
        ISBN_13: req.body.ISBN13,
        complete_link: req.body.completeLink
	}

	// save the user
	Books.findByIdAndUpdate(id, data, function(err, book) {
	if (err) throw err;

	res.send('Successfully! Employee updated - '+book.title);
	});
});

// delete a employee by id
app.delete('/api/employees/:employee_id', function(req, res) {
	console.log(req.params.employee_id);
	let id = req.params.employee_id;
	Employee.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Deleted.');	
	});
});

// delete a book by id
app.delete('/api/books/:book_id', function(req, res) {
	console.log(req.params.book_id);
	let id = req.params.book_id;
	Books.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Deleted.');	
	});
});

// Insert using form
app.get('/api/insert', (req,res)=>{
    res.render('insertBook')
})



app.listen(port);
console.log("App listening on port : " + port);
