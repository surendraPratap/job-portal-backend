const User = require('../../models/authentication')
const { errorMessage, successMessage } = require('../response')
const { validationResult } = require('express-validator')
const ClientSchema = require('../../models/client')


// get the adminId passed in service url
exports.getAdminById = (req, res, next, id) => {

    User.findById(id).exec((error, admin) => {
        if (error) {
            return res.status(400).json(errorMessage(`No Admin found`))
        }
        req.profile = admin;
        next();
    })
}

// get the adminId passed in service url
exports.getClientById = (req, res, next, id) => {

    ClientSchema.findById(id).exec((err, client) => {
        if (err) {
            return res.status(400).json(errorMessage(`No Client found`))
        }

        req.client = client;
        next();
    })
}

//Creating the Client by Admin
exports.createClient = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errorMessage(errors.array()[0].msg))
    }

    let clientBody = req.body;

    req.body.creater = req.profile._id
    var client = new ClientSchema(req.body);
    client.save((error, client) => {
        if (error) {
            return res.status(400).json(errorMessage(`fail to create client record ${error}`))
        }

        return res.status(200).json(successMessage(`Client ${client.name} created successfully`))
    })
}

// Read Get all User
exports.getAllClients = (req, res) => {
    ClientSchema.find({ creater: req.profile._id }, (error, client) => {
        if (error) {
            return res.status(400).json(errorMessage(`fail to get the clients profiles`))
        }

        return res.status(200).send(client);
    })
}

//Update the details of Client
exports.updateClientDetails = (req, res) => {
    const { id } = req.client;
    ClientSchema.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (error, client) => {
            if (error) {
                c
            }

            return res.status(200).json(successMessage(`Record updated successFully`))
        }
    )
}

// Delete the Client 
exports.removeClient = (req, res) => {
    const { id, email } = req.client;
    ClientSchema.findByIdAndDelete(id, (error, resul) => {
        if (error) {
            return res.status(400).json(errorMessage(`fail to delete the client details for  ${email}`))
        }
        res.status(200).json(successMessage(`Client details delete successfully`))
    })
}