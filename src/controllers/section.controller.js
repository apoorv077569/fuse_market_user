import Section from "../models/section.model.js";
import Question from "../models/question.model.js";

export const getSection = async(req,res) =>{
    try{
        const section = await Section.find({isAcgtive:true}).select("name description");
        return res.status(200).json({
            success:true,
            count:section.length,
            section
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
        });
    }
};

export const questionBySection = async(req,res) =>{
    try{
        const {id} = req.params;
        const section = await Section.findById({id});
        if(!section) return res.status(404).json({
            success:false,
            message:"Section not found",
        });

        const questions = await Question.find({sectionId:id}).select("question options correctAnswer");
        return res.status(200).json({
            success:true,
            message:"Question fetched",
            section:section.name,
            totalQuestions:questions.length,
            questions,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
        });
    }
}