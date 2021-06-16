const express = require('express');
const { isClient, isLoggedIn, isAuthenticated } = require('../../controllers/admin/roleCheck');
const router = express();
const { check, validationResult } = require('express-validator')
const { manageProfile, getLoggedById } = require('../../controllers/client/client')

//Parameter passing and methods
router.param('userId', getLoggedById)

//Route to manage/update the profile of Client(himself). If Loggedin as Client
router.put('/client/:userId/profile', [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "enter the valid emailId").isEmail(),
    check("company", "password should have at least 3 character").isLength({ min: 3 })
], isLoggedIn, isAuthenticated, isClient, manageProfile)

module.exports = router;