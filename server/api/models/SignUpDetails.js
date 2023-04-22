const mongoose = require('mongoose');

//Creating Schema and Model
const schema = mongoose.Schema;

const signup_details_schema = new schema({

    username: {
        type: "String",
        lowercase: true,
        required: [true, 'Enter a username'],
        unique: true,
    },

    email: {
        type: "String",
        lowercase: true,
        required: [true, 'Enter an email'],
        unique: true,
    },

    password: {
        type: "String",
        required: [true, 'Enter password'],
        minlength: [2, 'Password must be at least 2 characters'],
    },

    isverified: {
        type: "Boolean",
        default: false,
    },


    isregistered: {
        type: "Boolean",
        default: false,
    },


    createdat: {
        type: "Date",
        default: Date.now,
    },

});

const signup_details_model = mongoose.model("signup_details",signup_details_schema);

//Exporting User Model
module.exports = signup_details_model;