const { errorMessage, successMessage } = require('../response')
const RecruiterSchema = require('../../models/recruiter')
const User = require('../../models/authentication')
const { check, validationResult } = require('express-validator')


//Parameter methods get the admin id passed in service url
exports.getLoggedById = (req, res, next, id) => {

    User.findById(id).exec((error, recProfile) => {
        if (error) {
            return res.status(401).json(errorMessage(`Profile not found for logged in User`))
        }

        //storing the admin details in request with object name recruiter profile
        req.recruiterProfile = recProfile;
        next();
    })
}

// Get the  recruiter Id passed in service url
exports.getRecruiterById = (req, res, next, id) => {

    RecruiterSchema.findById(id).exec((error, recProfile) => {
        if (error) {
            return res.status(401).json(errorMessage(`Recruiter Profile not found`))
        }
        //storing the Recruiter details in request with object name recruiter profile
        req.recruiterProfile = recProfile;
        next();
    })
}

//update the Recruiter Profile by logged admin
exports.updateRecruiterProfile = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(422).json(errorMessage(errors.array()[0].msg))

    }
    const { id } = req.recruiterProfile;
    // update the recruiter profile by find the ID
    RecruiterSchema.findOneAndUpdate(
        { _id: id },
        { $set: req.body }, { new: true, useFindAndModify: false }, (err, recruiter) => {
            if (err) {
                return res.status(400).json(errorMessage(`fail to update the details for  ${email}`))
            }
            if (!recruiter) {
                return res.status(400).json(errorMessage(`No record found for requested Email: ${email}`))
            }
            //send back the response 
            res.status(201).json(successMessage(`Record Updated Successfully`))
        }
    )


}