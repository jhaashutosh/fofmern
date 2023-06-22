const mongoose = require("mongoose");

const schema = mongoose.Schema;

const website_details_schema = new schema({
    totalVisitors: {
        type: Number,
        default: 0
    },

    totalUsers: {
        type: Number,
        default: 0
    },

    donationAmount: {
        type: Number,
        default: 0
    }
});

const website_details_model = mongoose.model("website_details", website_details_schema);

module.exports = website_details_model;



