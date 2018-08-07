'use strict';

const express = require("express")
const port = process.env.PORT || 3000
const fs = require('fs')
const app = express()
const io = require('socket.io').listen(app.listen(port))
const http = require('https')
const bodyParser = require('body-parser')
const path = require('path')
const request = require('request')


const token = `Basic ${process.env.TOKEN}`

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/dist')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + 'index.html');
});

app.post("/orders", (req, res) => {

  const options = {
    method: 'POST',
    body: req.body, 
    json: true, 
    url: 'https://sandbox.moip.com.br/v2/orders/', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }

  request(options, (err, data) => {
    if (err) {
      res.writeHead(500);
      return
    }
    res.json(data.body)
  })

})

app.post("/orders/:id", (req, res) => {

  const options = {
    method: 'POST',
    body: req.body, 
    json: true, 
    url: 'https://sandbox.moip.com.br/v2/orders/' + req.params.id + '/payments',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token      
    }
  }

  request(options, (err, data) => {
    if (err) {
      res.writeHead(500);
      return
    }
    res.json(data.body)
  })
  
})

app.post("/", (req, res) => {
    res.writeHead(200);
    io.emit('post', {data: req.body});
    res.end();
});



module.exports = app