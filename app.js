const express = require('express')
const app = express()

const routes = require('./routes')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use(routes);

module.exports = app;