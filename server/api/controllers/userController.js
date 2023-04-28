const all_details_model = require("../models/AllDetails");

exports.userRegister = (req, res) => {
  const {
    username,
    fullName,
    imageURL,
    instagram,
    bio,
    gender,
    state,
    city,
    schoolDetails,
  } = req.body;

  console.log(req.body);
};
