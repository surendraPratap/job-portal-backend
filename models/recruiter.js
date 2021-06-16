
var mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 32,
            trim: true,
        },
        lastname: {
            type: String,
            maxlength: 32,
            trim: true
        },
        email: {
            type: String,
            maxlength: 40,
            trim: true,
            unique: true
        },
        company: {
            type: String
        },
        userinfo: {
            type: String,
            trim: true
        },
        creater: {
            type: mongoose.Schema.Types.ObjectId
        },
        assingedpost: []


    },
    { timestamps: true }
)

module.exports = mongoose.model("RecruiterSchema", recruiterSchema)
