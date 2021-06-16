const User = require('../models/authentication');
const { check, validationResult } = require('express-validator');
const { errorMessage } = require('./response');
var jwt = require("jsonwebtoken");
require('dotenv').config()


//Sign  Up the User
exports.signup = (req, res) => {

    // validating least required field
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).json(errorMessage(errors.array()[0].msg))
    }

    //Creating the Schema
    const user = new User(req.body);
    const { email } = req.body

    //Check If user already exist with inserted email Id
    User.findOne({ email }, (err, details) => {

        if (details) {
            return res.status(400).json(errorMessage(`Already exist user with ${email} emailId`))
        }
        else {

            //Insert the User Detail 
            user.save((error, user) => {

                if (error) {
                    return res.status(400).json(errorMessage(error))
                }
                const { _id, name, lastname, email, company, userinfo } = user;
                res.json({
                    _id: _id,
                    name: name,
                    lastname: lastname,
                    email: email,
                    company: company,
                    userinfo: userinfo
                });
            })
        }
    })




}
// Sign in the Useer
exports.signin = (req, res) => {
    const { email, password } = req.body;

    // Validating the User for email type of Email and password should have at least 3 char
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).json(errorMessage(errors.array()[0].msg))
    }

    /* logged in with Email and password
        check for email in User Schema and 
        encrypt the given "password" to  decrypt calling the schema methods authenticate()
    */
    User.findOne({ email }, (err, user) => {
        console.log(user)
        if (err || !user) {
            return res.status(400).send(errorMessage(`No user found `))
        }

        if (!user.authenticate(password)) {
            return res.status(400).send(errorMessage(`Email and password do not match`))
        }

        // Insert the tokens and logged in details in User cookie
        const { name, email, lastname, role, company, userinfo, id } = user;
        let token = jwt.sign({ _id: id }, process.env.KEYCODE);


        // send back the user details with generated token
        return res.status(200).json(
            {
                tokens: token,
                user: {
                    _id: id,
                    name: name,
                    email: email,
                    lastname: lastname,
                    role: role,
                    company: company,
                    userinfo: userinfo
                }

            })
    })
}

//Sign out the user 
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};