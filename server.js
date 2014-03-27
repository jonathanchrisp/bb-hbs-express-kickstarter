'use strict';

// modules
var express         = require('express'),
    exphbs          = require('express3-handlebars'),
    morgan          = require('morgan'),
    compress        = require('compression'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    errorHandler    = require('errorhandler');

var app = express();

// routes
require('./routes')(app);

// env and port
var env   = process.env.NODE_ENV || 'development';
var port  = process.env.PORT || 3000

// handlebars engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// middleware
app.use(morgan({ immediate: true, format: 'dev' }));
app.use(compress());
app.use(bodyParser());        // pull information from html in POST
app.use(methodOverride());    // simulate DELETE and PUT
console.log(__dirname);
app.use(express.static(__dirname, '/public'));

// development only
if ('development' == env) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

app.listen(port);
console.log('Express server listening on port ' + port);
