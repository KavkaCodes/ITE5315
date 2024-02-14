const express = require('express')
const app = express()
const port = 3000

app.get('/std/:name', (req, res) => {
    res.send(`${req.params.name} is my name`)
})

app.get('/std/', (req, res) => {
    res.send(req.query)
})


app.listen(port, () => {
    console.log(`Question 3 express app listening on port ${port}`)
  })
