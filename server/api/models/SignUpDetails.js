const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Creating Schema and Model
const schema = mongoose.Schema;

const signup_details_schema = new schema({
  username: {
    type: "String",
    lowercase: true,
    required: [true, "Enter a username"],
    unique: true,
  },

  email: {
    type: "String",
    lowercase: true,
    required: [true, "Enter an email"],
    unique: true,
  },

  password: {
    type: "String",
    required: [true, "Enter password"],
    minlength: [2, "Password must be at least 2 characters"],
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

//Encrypting password before saving to database! using bcrypt
signup_details_schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const signup_details_model = mongoose.model(
  "signup_details",
  signup_details_schema
);

//Exporting User Model
module.exports = signup_details_model;
