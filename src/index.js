import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB"
import routes from "./routes";
import cors from "cors";
import cookieParser from 'cookie-parser'

let dotenv = require("dotenv");
dotenv.config();

let app = express();

// Config app
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

connectDB();

let port = process.env.PORT || 6969;

routes(app);


app.listen(port, () => {
    console.log("Server is running in port " + port);
});