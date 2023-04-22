//Importing Necessary Packages
const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

//Importing Necessary Files
const connection = require('./api/utility/dbConnection');

//Middlewares -->

//For getting values from HTML form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Details About Requests.
app.use(morgan("dev"));

//Environment Variables
const PORT = process.env.PORT;
const DB_URL = process.env.DBURI;

//Importing Schema and Model
const SignUpDetails = require('./api/models/SignUpDetails');

//Connection to MongoDB Database
connection(DB_URL);

//Listening to Server
app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`));

//Home Route
app.get('/',(req,res) => {
    res.send("This is Home Page!");
});


//Signup Route -> POST Method 
app.post('/signup', (req,res) => {

    /*Input Form Data: -->
    {
        username:  "rk_25",
        email:     "rahul25@gmail.com",
        password:  "test123",
    } 
    */

    console.log("📑 Sign Up Form Data: \n",req.body);
    const { username, email, password } = req.body;

    //Saving Data to Database SignUpDetails Model
    const signup_details = new SignUpDetails({username, email, password});

    signup_details.save()
    .then(data => {
        console.log("✅ SignUp Details Saved to Database Successfully! \n",data);
        res.status(200).json({ message: "✅ SignUp Details Saved to Database Successfully!!"});
    })
    .catch(err => {
        console.log("😥 Error in Saving Sign Up Form Data to Database: \n",err);
        res.status(500).json({ message: "😥 Error in Saving Sign Up Form Data to Database!"});
    });

});

