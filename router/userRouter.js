import { createUser, login } from "../controllers/userController.js";
import express from "express";
import User from "../models/userSchema.js";
import { authenticateTokenDecode } from "../middleware/authenticate.js";
const router = express.Router();

router.post('/new',createUser)
router.post('/login',login)

router.get('/profile',authenticateTokenDecode,async(req,res)=>{
    console.log(req.user.userId);
    const WholeUser =await User.findById(req.user.userId);
    res.status(200).json({user:WholeUser});
})

export default router;