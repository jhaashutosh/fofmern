//Importing Necessary Packages
import express from 'express';
import  dotenv  from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();

//Importing Necessary Files
import connection from './api/utility/dbConnection.js';

//Middlewares -->

//For getting values from HTML form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Details About Requests.
app.use(morgan("dev"));


//Environment Variables
const PORT = process.env.PORT;
const DB_URL = process.env.DBURI;

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
    console.log("📑 Sign Up Form Data: \n",req.body);

    //Saved to Database Successfully
    res.status(200).json({
        message: "📑 Sign Up Form Data received Successfully!"
    });
});

