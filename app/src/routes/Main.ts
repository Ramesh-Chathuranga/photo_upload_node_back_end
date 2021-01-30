import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import FileDispatcher from "./file";


const mainDispatcher = express.Router();
mainDispatcher.use(cors());
mainDispatcher.use(bodyParser.json())
mainDispatcher.use("/api/v1/file",FileDispatcher);
export default mainDispatcher;
