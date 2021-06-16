const User = require('../../models/authentication')
const { errorMessage, successMessage } = require('../response')
const { check, validationResult } = require('express-validator')

const RecruiterSchema = require('../../models/recruiter');


// get the admin Id passed in service Url
exports.getAdminById = (req, res, next, id) => {

    User.findById(id).exec((error, admin) => {
        if (error || !admin) {
            return res.status(400).json(errorMessage(`No admin found`))
        }

        req.profile = admin;
        next();
    })

}

// get the recruiter Id passed in service Url
exports.getRecruiterById = (req, res, next, id) => {
    RecruiterSchema.findById(id).exec((error, recruite) => {

        if (error || !recruite) {
            return res.status(400).json(errorMessage(`No Recruiter found`))
        }

        req.recruiter = recruite;

        next();
    })
}

//Creating the Recruiter by Admin
exports.createRecruiter = (req, res) => {


    let checker = validationResult(req);

    if (!checker.isEmpty()) {

        return res.status(422).json(errorMessage(checker.array()[0].msg))
    }

    //Saving the Recruiters Details in Recruiter Schema
    let recruiteBody = req.body;
    req.body.creater = req.profile._id;
    var recruiter = new RecruiterSchema(req.body);
    recruiter.save((error, recruiterData) => {

        if (error) {

            return res.status(400).json(errorMessage(`Recruiter already Exists.`))
        }
        //Saving the Recruiter Details in User Schema(which used for log in authentication)
        recruiteBody.role = "R";
        var user = new User(recruiteBody)
        user.save((err, user1) => {

            if (err) {
                return res.status(400).json(errorMessage(`fail to add recruiter to user info`))
            }
            return res.status(200).json(successMessage(`Recruiter ${recruiterData.name} created successfully`))
        })

    })
}
//Read the Recruiter by Admin
exports.getAllRecruiter = (req, res) => {
    RecruiterSchema.find({ creater: req.profile._id }, (error, recruiter) => {
        if (error) {
            return res.status(400).json(errorMessage(`fail to get the recruiters profiles`))
        }

        return res.send(recruiter);
    })
}



//Update  the Recruiter by Admin
exports.updateRecruiter = (req, res) => {

    let checker = validationResult(req);

    if (!checker.isEmpty()) {

        return res.status(422).json(errorMessage(checker.checker[0].msg))
    }

    const { _id, email } = req.recruiter;

    /* Updating the profile of Recuiter in both schema
        Recruiter and User Schema */
    RecruiterSchema.findByIdAndUpdate(
        { _id: _id },
        { $set: req.body }, { new: true, useFindAndModify: false }, (err, recruiter) => {
            if (err) {
                return res.status(400).json(errorMessage(`fail to update the details for ${email} `))
            }

            User.findOneAndUpdate({ email }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, recruiter) => {
                if (err) {
                    return res.status(400).json(errorMessage(`fail to update the details for ${email} `))
                }
                if (!recruiter) {
                    return res.status(400).json(errorMessage(`No record found for requested Email: ${email}`))
                }
                res.json(successMessage(`Record Updated Successfully`))
            })

        }
    )
}

// Delete the Recruiter from Recruiter and User Schema by Admin 
exports.removeRecruiter = (req, res) => {
    // console.log(req.recruiter)
    const { _id, email, name } = req.recruiter;

    RecruiterSchema.findOneAndDelete({ _id }, (err, results) => {
        console.log("ERROR", err)
        if (err) {
            return res.status(400).json(errorMessage(`fail to delete the details for  ${email}`))
        }
        const { email } = results

        User.findOneAndDelete({ email }, (err, results) => {

            if (err) {
                return res.status(400).json(errorMessage(`fail to delete the details for  ${email}`))
            }
            if (!results) {
                return res.status(400).json(errorMessage(`No record found for requested Email: ${email}`))
            }

            return res.json(successMessage(`Recruiter ${name} is delete successfully.`))
        })

    })
}
