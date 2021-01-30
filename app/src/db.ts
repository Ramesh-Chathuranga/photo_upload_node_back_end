import mongoose  from "mongoose";

const dbConnection = async()=>{
    console.info(" ur is : ",process.env.MONGO_URI);
    try{
         const dbCon = await mongoose.connect(`${process.env.MONGO_URI}`,{useNewUrlParser:true,
        useUnifiedTopology:true, useFindAndModify:false});
        console.log("db connection successful ")
    }catch(error){
    console.info("db coonection fail , ",error);
    }
};

export {dbConnection}