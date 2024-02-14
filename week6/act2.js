const express = require('express')
const app = express();
app.use(express.json())


const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/getData', function(req,res){
    var myInfo= [
        {
            name : "Sumedh",
            age : "23",
            occupation : "Student",
            author : false
        },
        {
            name : "Kunal",
            age : "29",
            occupation : "Student",
            author: true
        },
        {
            name : "Hero",
            age : "50",
            occupation : "Developer",
            author : false
        },
        {
            name : "John Doe",
            age : "87",
            occupation : "Retired",
            author : false
        },
    ];
    res.render('viewData', {
        data: myInfo,
        layout: false
    })
})


app.listen(8080);