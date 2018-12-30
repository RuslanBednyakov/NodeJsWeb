import {checkAuth} from '../services/auth'
import * as customErrors from '../error'
import * as Controller from '../controller';

const express = require('express');
const router = express.Router();


router.get('/sign-in', function(req, res, next) {
  res.render('auth');
})

router.get('/sign-up', function(req, res, next) {
  res.render('signUp');
})

router.get('/search', function(req, res, next) {
  res.render('search');
})


router.get('/home', checkAuth, function(req, res, next) {
  res.render('homePage');
})


router.get('/my-page', checkAuth, function(req, res, next) {
  res.render('myPage');
})
router.get('/news', checkAuth, function(req, res, next) {
  return next(new customErrors.HttpError(401, 'Sorry, this page is not available for now'));
})
router.get('/friends', checkAuth, function(req, res, next) {
  return next(new customErrors.HttpError(401, 'Sorry, this page is not available for now'));
})
router.get('/chat', checkAuth, function(req, res, next) {
  return next(new customErrors.HttpError(401, 'Sorry, this page is not available for now'));
})

export { router as staticPages };