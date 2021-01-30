"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const photo_1 = require("../modal/photo");
const lodash_1 = __importDefault(require("lodash"));
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
        cb(file, false);
    }
};
const upload = multer_1.default({ storage, limits, fileFilter });
const router = express_1.default.Router();
router.post("/", upload.single('image_url'), async (req, res, next) => {
    //   console.log("req: ", req);
    try {
        const path = lodash_1.default.get(req, "file.path", null);
        if (!lodash_1.default.isNull(path)) {
            const pic = new photo_1.Photo({
                img: req.file.path,
            });
            await pic.save();
            const list = await photo_1.Photo.find({});
            const data = {
                list, new_img: path, sucess: !lodash_1.default.isNull(path), statusCode: lodash_1.default.isNull(path) ? 1 : 0
            };
            res.status(200).send(data);
        }
        else {
            res.status(400).send(req);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = router;
