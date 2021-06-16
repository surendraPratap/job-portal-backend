const User = require("../../models/authentication")

var expressJwt = require("express-jwt");
const { errorMessage } = require("../response");

/* MIDDLEWARE AUUTHENTICATION FOR ROLE AS 'ADMIN', 'CLIENT' AND 'RECRUITER'  */

//Check the Is User logged in or not
exports.isLoggedIn = expressJwt({
    secret: process.env.KEYCODE,
    userProperty: "auth"
});

/* check user is verified successfully regulary based on token user have in browser*/
exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(400).json(errorMessage(`Please login!`))
    }
    next();
}

// Authenticate for admin role with 'A'
exports.isAdmin = (req, res, next) => {
    if (req.profile.role !== "A") {
        return res.status(400).json(errorMessage('Access Denied. You are not assigned to Admin role'))
    } else {
        next();
    }
}

// Recruiter for admin role with 'R'
exports.isRecruiter = (req, res, next) => {
    if (req.recruiterProfile.role !== "R") {
        return res.status(400).json(errorMessage('Access Denied. You are not assigned to for Recruiter role'))
    } else {
        next();
    }
}

// Client for admin role with 'C'
exports.isClient = (req, res, next) => {
    if (req.profile.role !== "C") {
        return res.status(400).json(errorMessage('Access Denied. You are not assigned to for Client role'))
    } else {
        next();
    }
}