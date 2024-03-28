//ITE5315--Professor: Shahdad
const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = process.env.PORTNO | 8080;

// Set Templating Enginge
const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    // layoutsDir: 'path/to/layouts'
}));
app.set('view engine', 'hbs');

app.get('/groupact', (req,res)=>{
    res.render('groupact')
})

app.listen(port, () => console.info(`App listening on port: ${port}`))