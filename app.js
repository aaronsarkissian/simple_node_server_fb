var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const FB = require('fb');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/*
*
* FB API
*
*/

const pageToken = "";
const userToken = "";
FB.setAccessToken(pageToken);

FB.api('oauth/access_token', {
    client_id: "",
    client_secret: "",
    grant_type: 'client_credentials',
    scope: 'manage_pages, publish_pages',
    apiVersion: "v2.10",
    redirect_uri: 'http://localhost:3000/'
}, res => {
    if (!res || res.error) {
        const error_message = !res ? 'error occurred during the token request' : res.error;
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Didnt work'
            })
        };
        //context.succeed(response);
        // context.failed(new Error(error_message));
        console.log(error_message);
        return;
    }
    var {
        access_token
    } = res;
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Success',
            access_token
        })
    };
    //context.succeed(response);
    //FB.setAccessToken(access_token);
});

const msg = "message from facebook-node-sdk WOW!";
    FB.api('me/feed', 'POST', { message: msg}, res => {
        if(!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
        }
        console.log('Post Id: ' + res.id);
    });