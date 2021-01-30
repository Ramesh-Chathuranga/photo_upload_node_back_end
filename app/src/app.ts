import express from "express";
import mainDispatcher from "./routes/Main";
import {dbConnection} from "./db";
import dotenv from "dotenv";

//to config environment variables
dotenv.config({path :'config/config.env' });
dbConnection();
const app = express();
app.use(mainDispatcher);
app.use('/uploads',express.static('uploads'))
const port = process.env.PORT || 3000;



app.listen(port, () => console.log("server is running on port" + port));