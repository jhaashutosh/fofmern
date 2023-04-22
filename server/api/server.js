
import express from 'express';

import connection from './api/utility/dbconnection.js';

import  dotenv  from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`))

const DB_URL = process.env.DBURL;

connection(DB_URL);