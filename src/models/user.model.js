import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    year_or_sem: {
      type: String,
      required: true,
    },
    password:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;
