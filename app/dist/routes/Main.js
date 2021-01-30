"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const file_1 = __importDefault(require("./file"));
const mainDispatcher = express_1.default.Router();
mainDispatcher.use(cors_1.default());
mainDispatcher.use(body_parser_1.default.json());
mainDispatcher.use("/api/v1/file", file_1.default);
exports.default = mainDispatcher;
