const userDetails = require("../models/AllDetails");
const userLoginDetails = require("../models/SignUpDetails");

exports.userRegister = async (req, res) => {
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

  const userData = new userDetails({
    username,
    fullName,
    imageURL,
    instagram,
    bio,
    gender,
    state,
    city,
    schoolDetails,
  });

  const user = await userLoginDetails.findOne({ username: username });

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }

  userData.save().then((data) => {
    console.log("✅ User Details Saved to Database Successfully! \n", data);
    res.status(200).json({
      message: "✅ User Details Saved to Database Successfully!!",
    });
  });
};
