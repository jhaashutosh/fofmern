const mongoose = require('mongoose');
const schema = mongoose.Schema;

const all_details_schema = new schema({

    username: {
        type: "String",
        unique: true,
        lowercase: true,
        required: [true, 'Enter a username'],
    },

    fullName: {
        type: "String",
        maxlength: [50, 'Name must be less than 50 characters'],
    },

    imageURL: "String",

    instagram: "String",

    bio: {
        type: "String",
        maxlength: [300, 'Bio must be less than 300 characters'],
    },

    gender: "String",

    state: "String",
    city: "String",

    schoolDetails: {
        class_LKG: "String",
        class_UKG: "String",
        class_I: "String",
        class_II: "String",
        class_III: "String",
        class_IV: "String",
        class_V: "String",
        class_VI: "String",
        class_VII: "String",
        class_VIII: "String",
        class_IX: "String",
        class_X: "String",
        class_XI: "String",
        class_XII: "String",
    }
});

const all_details_model = mongoose.model("all_details", all_details_schema);

module.exports = all_details_model;