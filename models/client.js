
var mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 32,
            trim: true,
            required: true
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
            unique: true,
            required: true
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
        }


    },
    { timestamps: true }
)

module.exports = mongoose.model("ClientSchema", clientSchema)
