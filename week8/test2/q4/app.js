const express = require('express')
var path = require('path');



const app = express()
const port = 5500
const data = require("./datasetQ4.json")

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        checkgpa: function (data) {
            if(data == ""){
                return('<td style=\"color: red;\">N/A</td>')
            } else{
                return('<td>' + data + '</td>');
            }
        },
    }}));
app.set('view engine', 'hbs');


app.get('/', (req,res)=>{
    res.render('format', {data:data})
})


app.listen(port, () => {
})