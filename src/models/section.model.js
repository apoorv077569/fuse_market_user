import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            require:true
        },
        description:{
            type:String
        },
        isActive:
        {
        type:Boolean,
        default:true
        },
    },
    {timestamps:true}
);
const Section = mongoose.model('Section',sectionSchema);
export default Section;
