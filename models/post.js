
var mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true
        },
        yearofexperience: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            required: true
        },
        skills: {
            type: String
        },
        companyDescription: {
            type: String,
            trim: true
        },
        salary: {
            type: String
        },
        notes: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("PostSchema", postSchema)
