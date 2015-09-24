/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path'), multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var mongodb = require("mongoose");
var favicon = require('favicon');
var logger = require('express-logger');
var errorHandler = require('errorhandler');
/*
 * var QB=require("quickblox"); var QuickBlox =QB.QuickBlox;
 * QB.init(27840,'q5tEFx9BOa2G2Lg','OuR85fgtxZ6eDn7');
 * QB.createSession(function(err, result) { if (err) { console.log('Something
 * went wrong: ' + err); } else { console.log('Session created with id ' +
 * result.id); } });
 */
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.set('view engine', 'jade');
app.use(cookieParser());
app.use(session({
	secret : 'WorkDocSecKey',
	cookie : {
		maxAge : 2 * 60 * 60 * 1000
	}
}));
// app.use(favicon());
// app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
	extended : true
}));
// app.use(multer({
// 	dest : './uploads/'
// }));
app.use(methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//apis
app.get('/visitor',routes.index)
app.get('/provider',routes.index)
app.get('/users', user.list);
app.post('/createUser', user.addUser);
app.post('/getUser', user.getUser);
app.post('/login', user.login);
app.post('/uploadImage', user.uploadImage);
 
app.post('/addQuestions', user.addQuestion);

app.post('/getRooms', user.getRooms);
app.post('/logout',user.logOut);

app.post('/getRoom', user.getRoom);


app.post('/Addcallee',user.addCalle)

app.get('*', routes.index);
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

// error handling
// err,req,res,next

