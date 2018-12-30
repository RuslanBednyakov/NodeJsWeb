import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import engine from 'ejs-mate';

import config from './config'
import session from 'express-session';
import sessionStore from '../services/sessionStore';
import {loadUser} from '../services/loadUser'
import * as customErrors from '../error'
import router from '../routes';


const app = express();

// use ejs-locals for all ejs templates:
app.use('/api/v1', express.static('./public'));
app.engine('ejs', engine);

app.set('views', './template');
app.set('view engine', 'ejs');

app.use(cookieParser());

// // Parse incoming request bodies
// // https://github.com/expressjs/body-parser
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.raw({ type: 'application/yaml' }));

//Using custom metod 'res.sendHttpError' to send HttpError
app.use(require('../middleware/sendHttpError'));

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

app.use(loadUser);


app.use('/', router);


app.use(function(error, req, res, next) {
  if(typeof error == 'number') {
    error = new customErrors.HttpError(error);
  }
  if(error instanceof customErrors.HttpError) {
    res.sendHttpError(error);
  } else {
    // Development error handler
    // Displays stacktrace to the user
    if (app.get('env') === 'development') {
    res.status(error.status || 500);
    console.log('Error from middleware', error);
    res.send({message: error.message, error});
    };
    // Production error handler
    // Does not display stacktrace to the user
    res.status(err.status || 500);
    res.send(err);
  }
});

export default app;