import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
const saltRounds = 10;

export const createUser=async(req,res)=>{
  
    try {
        const {email,password}=req.body;
        const hashedPasswrd =await bcrypt.hash(password,saltRounds)//encrypted password
        //bcrypt uses few factors to generate hashedPasswords 1. time ,region , connection setup
        const user = new User({email:email,password:hashedPasswrd});//by default mongodb will
        //provide an unique userId to every user
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
    }

}


// decrypt is not possible with bcrypt 
// we again enctrypt the password and then compare it against with stored one from the database
// abc123 -> def456(stored in database)
// abc123 -> def456 (compare this with stored one from database)