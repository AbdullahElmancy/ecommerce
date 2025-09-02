import mongoose from "mongoose";
import ENV from "./env";

export const connection = async() =>{
    try {
        
        await mongoose.connect(ENV.MONGOKEY);
        console.log("Database connected");
    } catch(error){
        console.log("Database connection failed",error);
        process.exit(1);
    }
}