const User = require('../../models/authentication')
const { errorMessage, successMessage } = require('../response')
const { check, validationResult } = require('express-validator')

// get the client Id passes in service url
exports.getLoggedById = (req, res, next, id) => {

    User.findById(id).exec((error, user) => {
        if (error) {
            return res.status(400).json(errorMessage(`No User profile found`))
        }
        console.log(user)
        req.profile = user;
        next();
    })
}

// Update the profile of Client (himself) by logged in
exports.manageProfile = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errorMessage(errors.array()[0].msg))
    }
    const { id } = req.profile;
    // update the profile based on id passed in url
    User.findByIdAndUpdate(
        { _id: id },
        { $set: req.body }, { new: true, useFindAndModify: false }, (err, recruiter) => {
            if (err) {
                return res.status(400).json(errorMessage(`fail to user profile ${email}`))
            }
            if (!recruiter) {
                return res.status(400).json(errorMessage(`No record found for requested Email: ${email}`))
            }

            res.status(201).json(successMessage('Record Updated Successfully'))
        }
    )
}
