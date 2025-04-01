import mongoose from "mongoose";
require('dotenv').config();
const mongoDbUrl = process.env.MONGODB_URL || '';
export const connectDB = async () => {
    try{
    await mongoose.connect(mongoDbUrl);
    }
    catch(error){
        console.log("Mongodb error", error);    }
    
}