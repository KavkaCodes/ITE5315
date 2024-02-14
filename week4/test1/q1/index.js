const http = require('http')

const server = http.createServer((req, res) => {

  if (req.url === '/') {

    res.write("Sumedh Udar - N01580256");

    res.end();

  }

  if (req.url === '/college/emps') {

    res.write(JSON.stringify([101, 220, 3303]));
    res.end();

  }

  if (req.url === '/random') {

    res.write(new Date(Date.now()).toDateString());

    res.end();

  }

});

server.listen(8000);