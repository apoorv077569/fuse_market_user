import dotenv from "dotenv";
import connectDB from "./src/config/db.js"
import app from "./src/app.js";
import mongoose from "mongoose";

dotenv.config({path:'./.env'});
console.log("EMAIL_USER =>", process.env.EMAIL_USER);

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    
  });
})
.catch((err) =>{
  console.error("MongoDB Conncetion Error: ",err);
  
})

if(mongoose.connection.readyState === 0){
  connectDB().then(()=>console.log("MongoDB Connected"));
}

export default function handler(req,res){
  return app(req,res);
}