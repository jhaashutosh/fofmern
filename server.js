//Importing Necessary Packages
import express from 'express';
import  dotenv  from "dotenv";

//Importing Necessary Files
import connection from './api/utility/dbconnection.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DBURL;

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`))

//Connection to MongoDB Database
connection(DB_URL);