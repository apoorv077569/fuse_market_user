import Section from "../models/section.model.js";
import Question from "../models/question.model.js";
import Submission from "../models/submission.model.js";

export const submitAnswer = async(req,res) =>{
    try{
        const userId = req.user.id;
        const{sectionId,answers} = req.body;

        if(!sectionId || !answers || !Array.isArray(answers) || answers.length === 0){
            return res.status(400).json(
                {
                    success:false,
                    message:"SectionId and Answers are required",
                }
            );
        }
        // find section 

        const section = await Section.find({sectionId});
        if(!section) {
            return res.status(404).json({
                success:false,
                message:"Section not found",
            });
        }
        let score = 0;
        for(const ans of answers){
            const question = await Question.findById(ans.questionId);
            if(question && question.correctAnswer){
                if(question.correctAnswer.trim().toLowerCase() === ans.answer.trim().toLowerCase()){
                    score++;
                }
            }
        }

        const submission = new Submission({
            userId,
            sectionId,
            answers,
            score
        });
        await submission.save();
        return res.status(201).json({
            success:true,
            message:"Answer submitted successfully",
            submissionId:submission._id,
            score,
        });
    }catch(err){
        return res.status(500).json(
            {
                success:false,
                error:err.message,
            }
        );
    }
};

export const getAllSubmission = async(req,res) =>{
    try{
        const id = req.user.id;
        
    }catch(err){
        res.status(500).json(
            {
                success:false,
                error:err.message,
            }
        );
    }
}