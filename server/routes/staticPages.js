import {checkAuth} from '../services/auth'
const express = require('express');
const router = express.Router();


router.get('/sign-in', function(req, res, next) {
  res.render('auth');
})
router.get('/sign-up', function(req, res, next) {
  res.render('signUp');
})
router.get('/home', checkAuth, function(req, res, next) {
  res.render('homePage');
})

export { router as staticPages };