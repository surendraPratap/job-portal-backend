var mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
            required: true,
            maxlength: 40,
            trim: true,
            unique: true
        },
        salt: String,
        encrypted_password: {
            type: String,
            required: true
        },
        userinfo: {
            type: String,
            trim: true
        },
        role: {
            type: String,
            trim: true,
            default: 'C'
        }, company: {
            type: String
        }

    },
    { timestamps: true }
)
//Creating the virtual field to accept the plain password and store schema field   encrypted_password
userSchema.virtual("password").set(function (plainUserPassword) {

    this._password = plainUserPassword;
    this.salt = uuidv4();
    this.encrypted_password = this.securePassword(plainUserPassword)

}).get(function () {
    return this._password;
})


//Schema methods
userSchema.methods = {
    //Methods to athenticate logged is user is same as user in DB with same email Id
    authenticate: function (plainUserPassword) {

        return this.securePassword(plainUserPassword) === this.encrypted_password;
    },
    //Methods to encrypt the password using the crypto module
    securePassword: function (plainUserPassword) {

        if (!plainUserPassword) {

            return "";
        }
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainUserPassword)
                .digest("hex")
        } catch (err) {
            return "";
        }
    }
}


module.exports = mongoose.model("User", userSchema);