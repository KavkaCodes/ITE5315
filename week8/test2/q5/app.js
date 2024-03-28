const express = require('express')
const http = require("http");
const { check, validationResult } = require('express-validator')


const app = express()
const port = 5500

app.use(express.urlencoded({ extended: true }));


const urlencodedParser = express.urlencoded({extended: false})


const handlebars = require('express-handlebars');
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.get('/', (req,res)=>{
    res.render('form');
})

app.post('/', urlencodedParser, [
    check('Product', 'This Product name must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('Price', 'Price is not valid').isNumeric()
],(req,res) => {
        const errors =  validationResult(req)
        if(!errors.isEmpty()) {
            // return res.status(422).jsonp(errors.array())
          
            const alert = errors.array()
            res.render('form', {
                errs: alert,
                layout: 'main.hbs' // do not use the default Layout (main.hbs) 
            });
        }
        if(errors.isEmpty()){
            var product = req.body.Product
            var price = req.body.Price
            if(price < 500 || price > 2000){
                price *= 1.08
            }
            res.send(`<p>The price of ${product} is $${price}</p>`)
        }
      
})

app.listen(port, () => {
})