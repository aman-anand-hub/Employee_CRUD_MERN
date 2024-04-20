const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true,
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email format",
        },
    },

    department: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    // if the document is a new document
    if (!this.isNew) {
        return next();
    }

    // find the document with the highest id
    const lastUser = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 });

    // assign new id to the record
    this.id = lastUser ? lastUser.id + 1 : 1;

    next();
});

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel;