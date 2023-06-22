//Importing Necessary Packages
const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoute = require("./api/routes/authRoutes");
const userRoute = require("./api/routes/userRoutes");
const azureUploadRoute = require("./api/routes/imageProcessRoute");
dotenv.config();

//Importing Necessary Files
const connection = require("./api/utility/dbConnection");
const azureConnection =
  require("./api/utility/azureConnection").azureConnection;

//Middlewares -->

//For getting values from HTML form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Details About Requests.
app.use(morgan("dev"));

//Environment Variables
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

//CORS -> Cross Origin Resource Sharing
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//Cookie Parser - For JWT Tokens
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Connection to MongoDB Database
connection(DB_URI);

//Connection to Azure's Database
azureConnection();

//Listening to Server
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

//authRoute
app.use("/auth", authRoute);

//userRoute
app.use("/user", userRoute);

//image or file upload route
app.use("/upload", azureUploadRoute);

//Home Route
app.get("/", (req, res) => {
  res.send("Server is Running on PORT: " + PORT);
});
