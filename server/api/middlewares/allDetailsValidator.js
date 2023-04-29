exports.allDetailsValidator = async (req, res, next) => {
  /*Input Form Data: -->
    {
        fullName: "",
        imageURL: "",
        instagram: "",
        bio: "",
        gender: "",
        state: "",
        city: "",
        schoolDetails = {LKG: "", UKG: "", I: "", II: "", III: "", IV: "", V: "", VI: "", VII: "", VIII: "", IX: "", X: "", XI: "", XII: ""}
    }
    */

  console.log("📑 AllDetails Form Data: \n", req.body);
  let {
    fullName,
    imageURL,
    instagram,
    bio,
    gender,
    state,
    city,
    schoolDetails,
  } = req.body;

  //Handling all False Value: undefined / null / 0 / -0 / NaN / "" / Converting to String: "undefined" / "null" / "0" / "-0" / "NaN" / ""
  if (!fullName) fullName = "";
  if (!imageURL) imageURL = "";
  if (!instagram) instagram = "";
  if (!bio) bio = "";
  if (!gender) gender = "";
  if (!state) state = "";
  if (!city) city = "";
  if (!schoolDetails) schoolDetails = {};

  if (!schoolDetails.LKG) schoolDetails.LKG = "###";
  if (!schoolDetails.UKG) schoolDetails.UKG = "###";
  if (!schoolDetails.I) schoolDetails.I = "###";
  if (!schoolDetails.II) schoolDetails.II = "###";
  if (!schoolDetails.III) schoolDetails.III = "###";
  if (!schoolDetails.IV) schoolDetails.IV = "###";
  if (!schoolDetails.V) schoolDetails.V = "###";
  if (!schoolDetails.VI) schoolDetails.VI = "###";
  if (!schoolDetails.VII) schoolDetails.VII = "###";
  if (!schoolDetails.VIII) schoolDetails.VIII = "###";
  if (!schoolDetails.IX) schoolDetails.IX = "###";
  if (!schoolDetails.X) schoolDetails.X = "###";
  if (!schoolDetails.XI) schoolDetails.XI = "###";
  if (!schoolDetails.XII) schoolDetails.XII = "###";

  //------------------------------------------------------------------------------------//

  //Trimming Values----------------------------------------------------------------------
  fullName = fullName.trim();
  imageURL = imageURL.trim();
  instagram = instagram.trim();
  bio = bio.trim();
  gender = gender.trim();
  state = state.trim();
  city = city.trim();
  //-----------------------------------------------------------------------------------//

  let allErrors = [];

  //Error Handling: -------------------------------------------------------------------->
  const allStates = [
    "select",
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Tripura",
    "Uttaranchal",
    "Uttar Pradesh",
    "West Bengal",
  ];

  const allGenders = ["Male", "Female", "Other"];

  if (!allStates.includes(state))
    allErrors.push({ stateError: "Invalid State" });
  if (!allGenders.includes(gender))
    allErrors.push({ genderError: "Invalid Gender" });

  //School Details Validation ---------------------------------------------------------->
  for (let key in schoolDetails) {
    let arr = schoolDetails[key].split("#");

    if (arr.length != 4) {
      allErrors.push({ schoolDetailsError: "Class " + key + ": Wrong Format" });
    } else {
      //Trimming the Spaces
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
      }

      //Converting to Number
      const year1 = arr[0];
      const year2 = arr[1];

      //Check if  year1 is of 4 digits and all digits are numbers
      if (year1 !== "" && (year1.length != 4 || isNaN(year1))) {
        allErrors.push({
          schoolDetailsError: "Class " + key + ": Invalid Year 1",
        });
      }

      if (year1 !== "" && (year2.length != 4 || isNaN(year2))) {
        allErrors.push({
          schoolDetailsError: "Class " + key + ": Invalid Year 2",
        });
      }

      //Concatenating After Trimming
      schoolDetails[key] = arr.join("#");
    }
  }
  //------------------------------------------------------------------------------------//

  //If any error found, then return error message
  if (allErrors.length > 0) {
    console.log("😥 Error in AllDetails Form Validation: \n", allErrors);
    res.status(400).json({
      message: "Error in AllDetails Form Validation",
      allErrors: allErrors,
    });
  }
  //If no error found, then call next() function
  else {
    req.data = {
      fullName,
      imageURL,
      instagram,
      bio,
      gender,
      state,
      city,
      schoolDetails,
    };
    next();
  }
};
