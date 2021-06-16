const express = require('express');
const { check, validationResult } = require('express-validator')
const { getAdminById, getClientById, createClient, getAllClients, updateClientDetails, removeClient } = require('../../controllers/admin/adminClient');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../../controllers/admin/roleCheck');
const router = express.Router();

//Parameter passing and methods
router.param('adminId', getAdminById)
router.param('clientId', getClientById)

//Route to Create the Client by Admin 
router.post('/admin/:adminId/client', [
    check('name', "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "enter the valid emailId").isEmail(),
    check("company", "password should have at least 3 character").isLength({ min: 3 })
], isLoggedIn, isAuthenticated, isAdmin, createClient)

// Read all client by admin 
router.get('/admin/:adminId/allClients', isLoggedIn, isAuthenticated, isAdmin, getAllClients)

// Update the selected client using the client ID by Admin
router.put('/admin/:adminId/:clientId/client', isLoggedIn, isAuthenticated, isAdmin, updateClientDetails)

//Remove/Delete the selected Client Id by Admin
router.delete('/admin/:adminId/:clientId/client', isLoggedIn, isAuthenticated, isAdmin, removeClient)



module.exports = router;