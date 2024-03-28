//  Importing libraries used in the application
const express = require('express');
const { body, check, validationResult } = require('express-validator');

const app = express();

// Middleware with no mount path so it is executed on every request
app.use(express.urlencoded({extended:true}))

// Post request to /checkuser
app.post(

   '/checkuser',
  // Second middleware. This middleware uses express validator to validate the email parameter 
   body('email').isEmail(),
  // Third middleware. This middleware uses express validator to validate the userID parameter 
   body('userID').isLength({ min: 5 }),

  (req, res) => {
    // Storing the validation result from the previous validation middlewares in a const
    const errors = validationResult(req);
    // If errors exist display error 404 page
    if (!errors.isEmpty()) {

     return res.status(400).send({ errors: errors.array() });

   }
  //  Else display the request body that contains the json object with email and userID
    res.send(req.body)

  })


// App is listening for requests on port 5500
app.listen(5500);