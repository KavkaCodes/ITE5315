const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/info', (req, res) => {
    res.send('Info route')
  })

  app.get('/api', (req, res) => {
    res.send('API route')
  })

  app.post('/add', (req, res) => {
    res.send('ADD route')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})