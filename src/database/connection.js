import mongoose from "mongoose";
import {env} from "../../config/index.js"

export const databaseConnection = async () => {
    await mongoose.connect(env.mongoURL).then(()=>{
       console.log("Conncted to database");
    }).catch((error)=>{
        console.log(error);
    })
}