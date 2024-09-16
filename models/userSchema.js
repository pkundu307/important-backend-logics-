import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
  },
  password: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

const User = mongoose.model('User', userSchema);
export default User;
