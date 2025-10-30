import section from "../models/section.model.js";
import user from "../models/user.model.js";

export const qrScan = async(req,res) =>{
    try{
        const {token} = req.params;
        if(!token){
            return res.status(400).json(
                {
                    "success":false,
                    "message":"Token is required"
                }
            );
        }
        const fetchUser = await user.findOne({qrToken:token});
        if(!fetchUser){
            return res.status(404).json({
                success:false,
                message:"Invalid QR or User"
            });
        }
        let sections = await section.find({},"name");
        if(!sections.length){
            sections = [
                {name:"Problem Solving"},
                {name:"Hackathon"},
                {name:"Digital Marketing"}
            ];
        }
        return res.status(200).json({
            success:true,
            user:{
                name:fetchUser.name,
                email:fetchUser.email
            },
            sections:sections.map((s)=>s.name),
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