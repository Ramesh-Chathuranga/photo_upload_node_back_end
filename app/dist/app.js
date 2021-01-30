"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Main_1 = __importDefault(require("./routes/Main"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
//to config environment variables
dotenv_1.default.config({ path: 'config/config.env' });
db_1.dbConnection();
const app = express_1.default();
app.use(Main_1.default);
app.use('/uploads', express_1.default.static('uploads'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server is running on port" + port));
