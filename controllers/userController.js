import bcrypt from 'bcrypt';
import User from '../models/userSchema.js'; // Import the User model
const saltRounds = 10; // Adjust salt rounds as needed

export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Encrypt password
        const user = new User({ email: email, password: hashedPassword }); // MongoDB will provide a unique userId to every user
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        // const isMatch = (user.password === password)//when password is not encrypted
        const isMatch = await bcrypt.compare(password, user.password)//when password is encrypted using bcrypt
                                            //$2b$10$3ujIsvcW.LaD
        if(!isMatch){
            return res.status(401).json({message: 'Invalid details'})
        }
        res.status(200).json({message:'user ok',user})
    }catch (error) {
    console.error(error);
    }
}
