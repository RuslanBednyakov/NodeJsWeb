import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import session from 'express-session';
import db from '../model';
import config from './config'

// import engine from 'ejs-mate';
// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

import router from '../routes';

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({
  db: db,
  table: 'Session'
})

const app = express();

// // use ejs-locals for all ejs templates:
// app.engine('ejs', engine);

// app.set('views', './template');
// app.set('view engine', 'ejs');

// app.get('/test', function(req, res) {
//   res.render('auth');
// })

app.use(cookieParser());

// Using Sessions for authorisation
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