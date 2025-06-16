import mongoose from "mongoose"
const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    emailid:{
        type:String,
        required:true,
        unique:true,
        }, 
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ["Candidate", "Recruiter"],
    },
    // resumeURL: {
    //     type: String, //cloudinary URL fetched 
    // },
    },
    {timestamps:true}
)
const User=mongoose.model("users",schema);
export default User;