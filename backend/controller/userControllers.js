import User from "../models/user.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'; 
dotenv.config(); 

const key=process.env.JWT_SECRET;

// export const searchUser=async(req,resp)=>{
//     try{
//         const emailid=req.params.emailid;
//         //console.log(emailid);
//         if(!emailid)
//             return resp.status(400).json({message:"Parameter was not passed"});
//         const currentUser=await User.findOne({emailid:emailid});
//         if(!currentUser)
//             resp.status(404).json({message:"User not found"});
//         else
//             resp.status(200).json(currentUser);
//     }
//     catch(error){
//         resp.status(500).json({error:error.message});
//     }
// };

// export const editProfile = async (req, res) => {
//   const { emailid } = req.params; // emailid to find user
//   const { username, resumeURL, password, emailid: newEmailid } = req.body; // fields to update

//   try {
//     let user = await User.findOne({ emailid: emailid });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (username) user.username = username;
//     if (resumeURL) user.resumeURL = resumeURL;
//     if (newEmailid) user.emailid = newEmailid;

//     // For password, hash it before saving
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     await user.save();
// //for security, remove password before sending response
//     const userResponse = user.toObject();
//     delete userResponse.password;

//     res.status(200).json(userResponse);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
  
export const viewProfile = async (req, res) => {
  try {
    const { emailid } = req.params;
    if (!emailid) {
      return res.status(400).json({ message: 'Email ID is required.' });
    }
    const currentUser = await User.findOne({ emailid }).select('-password');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
// forgot password
// export const forgot_password = async (req, res) => {
//   const { emailid } = req.body;

//   try {
//     const currentUser = await User.findOne({ emailid });

//     if (!currentUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     //for security and verification
//     const token = jwt.sign({ emailid }, key, { expiresIn: '1h' });

//     currentUser.resetToken = token;
//     currentUser.resetTokenExpiry = Date.now() + 3600000; // 1 hour
//     await currentUser.save();

//     const resetLink = `http://localhost:4000/reset-password?token=${token}`;

//     //Set up Nodemailer transporter through which email is sent acc to a set template
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: 'xyz@gmail.com', 
//       to: currentUser.emailid,
//       subject: 'Password Reset',
//       text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
//     };

//     await transporter.sendMail(mailOptions);

//     //Once set=success
//     res.status(200).json({ message: "Mail to reset password sent successfully!" });

//   } catch (error) {
//     console.error("Error in forgot password:", error);
//     res.status(500).json({ message: "An error occurred while processing the request." });
//   }
// };



// export const resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;
//   try {
//     const decoded = jwt.verify(token, key);
//     const user = await User.findOne({ emailid: decoded.email, resetToken: token });

//     //means if no user or the key has expired
//     if (!user || user.resetTokenExpiry < Date.now()) return res.status(400).send('Invalid or expired token');

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     //to invalidate the same reset token
//     user.resetToken = null;
//     user.resetTokenExpiry = null;
//     await user.save();

//     res.send('Password reset successfully');
//   } catch (err) {
//     res.status(400).send('Invalid token');
//   }
// };

