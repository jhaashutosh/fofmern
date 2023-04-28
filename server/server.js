//Importing Necessary Packages
const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoute = require("./api/routes/authRoutes");
const userRoute = require("./api/routes/userRoutes");
dotenv.config();

//Importing Necessary Files
const connection = require("./api/utility/dbConnection");

//Middlewares -->

//For getting values from HTML form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Details About Requests.
app.use(morgan("dev"));

//Environment Variables
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

//Connection to MongoDB Database
connection(DB_URI);

//Listening to Server
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

//authRoute
app.use("/auth", authRoute);

//userRoute
app.use("/user", userRoute);

//Home Route
app.get("/", (req, res) => {
  res.send("This is Home Page!");
});
