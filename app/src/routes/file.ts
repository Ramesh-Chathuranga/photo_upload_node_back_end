import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { Photo } from "../modal/photo";
import _ from "lodash";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + ".png");
    },
})
const limits = {
    fieldSize: 1024 * 1024 * 10
};
const fileFilter = (req: any, file: any, cb: any) => {
    const type = file.mimetype || file.type
    if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg' || type === 'image/PNG' || type === 'image/JPG' || type === 'image/JPEG') {
        cb(null, true)
    } else {
        cb(file,false)
    }
};

const upload = multer({ storage, limits, fileFilter });

const router = express.Router();

router.post("/",upload.single('image_url'), async (req: Request, res: Response, next: NextFunction) => {
 //   console.log("req: ", req);
    try {
        
        const path = _.get(req, "file.path", null);
        if (!_.isNull(path)) {
            const pic = new Photo({
                img: req.file.path,
            });
            await pic.save();
            const list = await Photo.find({})
            const data = {
                list, new_img: path, sucess: !_.isNull(path), statusCode: _.isNull(path) ? 1 : 0
            }
            res.status(200).send(data);
        } else {
            res.status(400).send(req);
        }
      
    } catch (error) {
        res.status(500).send(error);
    }


})


export default router;