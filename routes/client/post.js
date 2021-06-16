const express = require('express');
const { isClient, isLoggedIn, isAuthenticated } = require('../../controllers/admin/roleCheck');
const { createPosts, getLoggedById } = require('../../controllers/client/post');

const router = express();


router.param('userId', getLoggedById)


router.post('/client/:userId/post', isLoggedIn, isAuthenticated, isClient, createPosts)

module.exports = router;