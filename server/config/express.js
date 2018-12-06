import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import engine from 'ejs-mate';

import config from './config'
import session from 'express-session';
import sessionStore from '../services/sessionStore';
import * as customErrors from '../error'
import router from '../routes';


const app = express();

// use ejs-locals for all ejs templates:
app.use('/api/v1', express.static('./public'));
app.engine('ejs', engine);

app.set('views', './template');
app.set('view engine', 'ejs');

app.use(cookieParser());

// Using Sessions for Authorisation
app.use(session({
  secret: config.session.secret,
  name: config.session.name,
  cookie: config.session.cookie,
  store: sessionStore,
  resave: false,
  saveUninitialized: config.session.saveUninitialized
}))

sessionStore.sync();

// // Parse incoming request bodies
// // https://github.com/expressjs/body-parser
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.raw({ type: 'application/yaml' }));


// app.use('/', express.static('public'));


app.use('/api/v1', router);


app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(error, req, res, next) {
  if(typeof err == 'number') {
    err = new customErrors.HttpError(err);
  }
  if(err instanceof customErrors.HttpError) {
    res.render('error', {error: err});
  }
  next();
});

// Development error handler
// Displays stacktrace to the user
if (app.get('env') === 'development') {
  app.use(function(error, req, res, next) {
    res.status(error.status || 500);
    console.log('Error from middleware', error);
    
    res.send({message: error.message, error});
  });
}

// Production error handler
// Does not display stacktrace to the user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

export default app;
// module.exports = app;