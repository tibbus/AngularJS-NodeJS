var express = require('express');
var app = express();

// application web site ::
app.use('/', express.static(__dirname));

// proxy server ::
require('./proxy')(app);

// open server to this port ::
app.listen(8080);

console.log('web server started !');