const allDetails = require("../models/AllDetails");

//All Details Route -> POST Method  --> /auth/allDetails
exports.allDetailsController = async (req, res) => {
  console.log("📑 All Details Page Data (After Validation): \n", req.data);

  //Fetch From Database or JWT Token
  const username = req.user.username;
  console.log("🙋Username: ", username);

  const {
    fullName,
    imageURL,
    instagram,
    bio,
    gender,
    state,
    city,
    schoolDetails,
  } = req.data;

  //Saving All Details to Database
  const all_details = new allDetails({
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

  all_details
    .save()
    .then((data) => {
      console.log("✅ All Details Saved to Database Successfully! \n", data);
      res
        .status(200)
        .json({ message: "✅ All Details Saved to Database Successfully!!" });
    })

    .catch((err) => {
      console.log("😥 Error in Saving All Details to Database: \n", err);
      res
        .status(500)
        .json({ message: "😥 Error in Saving All Details to Database!" });
    });
};

//Search Friends by Class Details Route -> POST Method  --> /auth/searchFriends
exports.searchFriendsController = async (req, res) => {
  /*Input Form Data: -->
    {
        className:"UKG",
        hashString: "2007#2008#Kendriya Vidyalaya 12 Dwarka#idsxd8dsf9sd9f8"
    }
  */

  console.log("📑 Search Friends Page Data: \n", req.body);

  //Validation of Search Friends Form Data ====>
  let { className, hashString } = req.body;

  //Handling all False Value: undefined / null / 0 / -0 / NaN / "" / false
  if (!className) className = "";
  if (!hashString) hashString = "";

  //Trimming hashString
  hashString = hashString.trim();

  //Validation of className => UKG, LKG, I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII
  const validClassNames = [
    "UKG",
    "LKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  if (!validClassNames.includes(className)) {
    return res.status(400).json({ classNameError: "Invalid Class Name!" });
  }

  //Searching Friends in Database
  const friends = await allDetails.find({
    [`schoolDetails.${className}`]: hashString,
  });

  console.log("👫 Friends Found: \n", friends);
  return res.status(200).json({ "👫 Friends Found: ": friends });
};
