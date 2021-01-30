import mongoose, { Schema } from "mongoose";

//create schema
const PhotoSchema = new Schema({
  img:String
});



//create  modal
const Photo = mongoose.model("Photo", PhotoSchema);

//export  modal
export { Photo };
