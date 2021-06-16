const express = require('express');
const { createRecruiter, getAdminById, getAllRecruiter, getRecruiterById, updateRecruiter, removeRecruiter } = require('../../controllers/admin/adminRecruiter');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../../controllers/admin/roleCheck');
const { check } = require('express-validator')
const router = express.Router();


//Parameter passing and methods
router.param('adminId', getAdminById);
router.param('recId', getRecruiterById);

// Creating recruiter by Admin
router.post('/admin/:adminId/recruiter', [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "enter the valid emailId").isEmail(),
    check("company", "password should have at least 3 character").isLength({ min: 3 })
], isLoggedIn, isAuthenticated, isAdmin, createRecruiter)

/*
Read all the reacruiter created by logged in Admin
Admin can see all recruiter who are created by him
*/
router.get('/admin/:adminId/allrecruiter', isLoggedIn, isAuthenticated, isAdmin, getAllRecruiter)

/*
Update profile of reacruiter created by logged in Admin
Admin can update the recruiter profile  who are created by him
*/
router.put('/admin/:adminId/:recId/recruiter', [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "enter the valid emailId").isEmail(),
    check("company", "password should have at least 3 character").isLength({ min: 3 })
], isLoggedIn, isAuthenticated, isAdmin, updateRecruiter)

//Remove the Recruiter created by Logged in Admin
router.delete('/admin/:adminId/:recId/recruiter', isLoggedIn, isAuthenticated, isAdmin, removeRecruiter)

module.exports = router;