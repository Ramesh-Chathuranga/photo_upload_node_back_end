"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = async () => {
    console.info(" ur is : ", process.env.MONGO_URI);
    try {
        const dbCon = await mongoose_1.default.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true,
            useUnifiedTopology: true, useFindAndModify: false });
        console.log("db connection successful ");
    }
    catch (error) {
        console.info("db coonection fail , ", error);
    }
};
exports.dbConnection = dbConnection;
