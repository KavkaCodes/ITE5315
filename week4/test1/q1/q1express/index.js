const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Sumedh Udar - N01580256')
})

app.get('/college/emps', (req, res) => {
    res.send(JSON.stringify([101, 220, 3303]))
  })

app.get('/random', (req, res) => {
    res.send(new Date(Date.now()).toDateString())
})

app.get('/std/:name', (req, res) => {
    res.send(`${req.params.name} is my name`)
})
app.put('/putMethod', (req, res) =>{
    res.send("This is a put method")
    console.log("This is the console message");
})

  app.listen(port, () => {
    console.log(`Question 1 express app listening on port ${port}`)
  })