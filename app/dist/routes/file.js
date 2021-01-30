"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const photo_1 = require("../modal/photo");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + ".png");
    },
});
const limits = {
    fieldSize: 1024 * 1024 * 10
};
const fileFilter = (req, file, cb) => {
    const type = file.mimetype || file.type;
    if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg' || type === 'image/PNG' || type === 'image/JPG' || type === 'image/JPEG') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer_1.default({ storage, limits, fileFilter });
const router = express_1.default.Router();
router.post("/", upload.single('image_url'), async (req, res, next) => {
    console.log("req: ", req.file);
    const pic = new photo_1.Photo({
        img: req.file.path,
    });
    await pic.save();
    const list = await photo_1.Photo.find({});
    res.status(200).send(list);
});
exports.default = router;
