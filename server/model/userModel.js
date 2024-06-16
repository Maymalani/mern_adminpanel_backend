var { Schema, model } = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

var userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
});

userSchema.methods.genToken = async function () {
    try {
        return (
            jwt.sign(
                {
                    userId: this._id.toString(),
                    email: this.email
                },process.env.JWT_SEC_KEY
            )
        )
    } catch (error) {
        resizeBy.status(400).json({ error });
    }
};

var User = new model("User", userSchema);

module.exports = User;