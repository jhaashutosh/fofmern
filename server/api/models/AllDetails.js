const mongoose = require("mongoose");
const schema = mongoose.Schema;

const all_details_schema = new schema({
  username: {
    type: "String",
    unique: true,
    lowercase: true,
    required: [true, "Enter a username"],
  },

  fullName: {
    type: "String",
    maxlength: [50, "Name must be less than 50 characters"],
  },

  imageURL: "String",

  instagram: "String",

  bio: {
    type: "String",
    maxlength: [300, "Bio must be less than 300 characters"],
  },

  gender: "String",

  state: "String",
  city: "String",

  schoolDetails: {
    LKG: "String",
    UKG: "String",
    I: "String",
    II: "String",
    III: "String",
    IV: "String",
    V: "String",
    VI: "String",
    VII: "String",
    VIII: "String",
    IX: "String",
    X: "String",
    XI: "String",
    XII: "String",
  },
});

const userDetails = mongoose.model("userDetails", all_details_schema);

module.exports = userDetails;
