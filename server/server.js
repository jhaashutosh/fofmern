//Importing Necessary Packages
import express from 'express';
import  dotenv  from "dotenv";

//Importing Necessary Files
import connection from './api/utility/dbConnection.js';

const app = express();
dotenv.config();

//Environment Variables
const PORT = process.env.PORT;
const DB_URL = process.env.DBURI;

//Listening to Server
app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`))

//Home Route
app.get('/',(req,res) => {
    res.send("This is Home Page!");
});

//Connection to MongoDB Database
connection(DB_URL);