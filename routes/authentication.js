const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { signup, signin, signout } = require('../controllers/authentication')




router.post('/signup', [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "enter the valid emailId").isEmail(),
    check("password", "password should have at least 3 character").isLength({ min: 3 })
], signup);

router.post('/signin', [
    check("email", "enter the valid emailId").isEmail(),
    check("password", "password should have at least 3 character").isLength({ min: 3 })
], signin)

router.get('/signout', signout);

module.exports = router;
