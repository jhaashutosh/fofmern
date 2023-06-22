//Mongo DB Connection
const mongoose = require("mongoose");

const connection = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true });
    console.log("🍀 Database Connected successfully!");
  } catch (error) {
    console.log("😢 Error connecting to database!!!");
    console.log(error);
  }
};

module.exports = connection;
