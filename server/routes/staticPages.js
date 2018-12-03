import {checkAuth} from '../services/auth'
const express = require('express');
const router = express.Router();


router.use('/auth', express.static('public/auth'))
router.use('/signUp', express.static('public/sign-up'))
router.use('/home', checkAuth, express.static('public/home'))

export { router as staticPages };