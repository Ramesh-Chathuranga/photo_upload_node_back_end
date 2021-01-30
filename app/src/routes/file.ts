import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import {Photo} from "../modal/photo";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
     cb(null,new Date().toISOString()+".png");
    },
})
const limits = {
    fieldSize:1024*1024*10
};
const fileFilter = (req:any, file:any, cb:any)=>{
    const type =file.mimetype || file.type
 if(type==='image/png' || type==='image/jpg' || type==='image/jpeg' || type==='image/PNG' || type==='image/JPG' || type==='image/JPEG'){
     cb(null,true)
 }else{
     cb(null,false)
 }
};

const upload = multer({storage,limits,fileFilter});

const router = express.Router();

router.post("/",upload.single('image_url'),async(req:Request,res:Response,next:NextFunction)=>{
    console.log("req: ",req.file);
    const pic = new Photo({
         img:req.file.path,
      });
      await pic.save();
     const list = await Photo.find({})

    res.status(200).send(list);
})


export default router;