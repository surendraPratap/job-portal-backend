const express = require('express');
const { isRecruiter, isLoggedIn, isAuthenticated } = require('../../controllers/admin/roleCheck');
const { getLoggedById, updateRecruiterProfile, getRecruiterById } = require('../../controllers/recruiter/profilerecruiter');
const router = express.Router();

const { check } = require('express-validator')

//Parameter passing and methods
router.param('userId', getLoggedById);
router.param('recId', getRecruiterById);

//Route to Update the Reruiter Profile by login as Recruiter 
router.post('/recruiter/:userId/:recId/profile', [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "enter the valid emailId").isEmail(),
    check("company", "password should have at least 3 character").isLength({ min: 3 })
], isLoggedIn, isAuthenticated, isRecruiter, updateRecruiterProfile)

module.exports = router;