import {checkAuth} from '../services/auth'
const express = require('express');
const router = express.Router();


router.get('/login', function(req, res, next) {
  res.render('auth');
})
router.get('/registration', function(req, res, next) {
  res.render('signUp');
})
router.get('/homep', checkAuth, function(req, res, next) {
  res.render('homePage');
})

export { router as staticPages };