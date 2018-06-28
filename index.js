const express = require('express')
const app = express()
const routes = require('./routes')

routes(app)

app.listen(3000)
console.log('Node server is running on port 3000......')
