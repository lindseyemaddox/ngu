
// Load http module.
var http = require('http');

// Load express module.
var express = require('express');

// Initialize app object.
var app = new express();

// Basic routing.
app.get('/', function(req, res) {
    res.send('Front page');
});

// Create server and listen on port 3030.
http.createServer(app).listen(3030, function() {
    console.log('Server running...');
});
