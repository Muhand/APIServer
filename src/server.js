//Get the dependencies/imports
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const viewHelpers = require('./app/middlewares/viewHelpers');
const path = require('path');
const mongoose = require('mongoose');
const hat = require('hat');
const appname = "Muhand";
// const v1API = require('./app/controllers/api/v1/');

//Initialize the app
const app = express();
app.use(methodOverride('_method'));

//Connect to DB
mongoose.connect('mongodb://localhost:27017/apiserver');

//Configure app for bodyParser - Let's us grab data from the body of POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Express Session
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    //cookie: {maxAge: 60000} //Auto logout user after 1 minute
}));

//Connect Flash Middleware
app.use(flash());

//Set static Folder for CSS, images, jquery, etc...
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/:url/',express.static(path.join(__dirname, 'public')));
app.use('/:url/:url',express.static(path.join(__dirname, 'public')));
app.use('/:url/:url/:url',express.static(path.join(__dirname, 'public')));

////////////////////////////
//View Engine
////////////////////////////
app.engine('handlebars', exphbs({
  layoutsDir: '.\\app\\views\\layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}\\app\\views\\`);
app.use(viewHelpers.register());
app.locals.appname = appname;

//Routes
app.use(require('./app/controllers/api/v1/'));

// catch 404 and forward to error handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  // res.render('errors/404');
});


////////////////////////////
//Run the server
////////////////////////////
/**
 * Check if we have enviornment variable for the PORT
 * if so then use it,
 * otherwise just use port 3000
 */
var port = process.env.PORT || 3000;

//Fire up the server
// app.listen(port);
// app.set('port', (process.env.PORT || 8080));                    //Set the port

app.listen(port, function(err){                       //Start listening
  if(err){
    console.log(err);
  }
  else {
    console.log('Server started on port '+app.get('port'));   //Log the server started
  }
});

//Print message to the console
console.log('Server listening on port' + port);
