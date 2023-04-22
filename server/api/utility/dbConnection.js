//Mongo DB Connection 
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

    const connection = async (DB_URL)=>{

    try{
       await mongoose.connect(DB_URL,{useNewUrlParser:true});
       console.log("🍀 Database Connected successfully!");

    }
     catch(error){
        console.log("😢 Error connecting to database!!!");
        console.log(error);
    }
}

export default connection;