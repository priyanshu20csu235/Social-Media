// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.js'

// export const signin = async (req,res)=>{
//     const {email , password} = req.body;

//     try {
//         const existingUser=User.find({email});
//         if(!existingUser) res.status(404).json({Message : "User doesn't exist."})
//         const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
//         if(!isPasswordCorrect) res.status(404).json({Message: "Invalid Credentials"});
//         const token = jwt.sign({email: existingUser.email , id: existingUser._id},'test',{expiresIn:"1h"}); //Here test is a secret string and need to be stored in env file
//         res.status(200).json({result:existingUser,token});
//     } catch (error) {
//         res.status(500).json({message:"Something went wrong."});
//     }
// };

// export const signup = async (req,res)=>{

// };

