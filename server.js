var express = require('express')
var fallback = require('express-history-api-fallback')
var app = express()
var PORT = process.env.$PORT || process.env.PORT || 8080

app.use(express.static(__dirname + '/dist'))
app.use(fallback(__dirname + '/dist/index.html'))
app.listen(PORT)
