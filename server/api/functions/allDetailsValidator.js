
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
    let {fullName, imageURL, instagram, bio, gender, state, city, schoolDetails} = req.body;

    //Handling Undefined Values:
    if(fullName === undefined) fullName = "";
    if(imageURL === undefined) imageURL = "";
    if(instagram === undefined) instagram = "";
    if(bio === undefined) bio = "";
    if(gender === undefined) gender = "";
    if(state === undefined) state = "";
    if(city === undefined) city = "";
    if(schoolDetails === undefined){
        schoolDetails = {LKG: "", UKG: "", I: "", II: "", III: "", IV: "", V: "", VI: "", VII: "", VIII: "", IX: "", X: "", XI: "", XII: ""}
    }
    
    let allErrors = [];

    //Handling School Details Errors: ==========>


    //If any error found, then return error message
    if (allErrors.length > 0) {
        console.log("😥 Error in AllDetails Form Validation: \n", allErrors);
        res.status(400).json({message: "Error in AllDetails Form Validation", allErrors: allErrors });
    }
    //If no error found, then call next() function
    else next();
}