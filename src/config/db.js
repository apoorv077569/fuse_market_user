import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../../constants.js";

dotenv.config();

const connectDB = async() =>{
    try{
        const connectionInstace = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MONGO_DB CONNECTED !! DB_HOST: ${connectionInstace.connection.host}`);
        console.log(`DB NAME: ${DB_NAME}`);
    }catch(err){
        console.log("MongoDB Connection error: ",err.message);
        process.exit(1);
        
    }
}
export default connectDB;