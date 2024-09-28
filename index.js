import express from 'express';
import userRouter from "./router/userRouter.js"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
const server = express();
server.use(cors())
server.use(express.json());
dotenv.config();
async function connectDatabase() {
    await mongoose.connect('mongodb://localhost:27017/auth')
    console.log('database connected');
    //database connection 
  }
connectDatabase()//calling the function to start the database
  

server.get('/',(req, res) => {
    res.send('Hello World!');
})
server.use('/api/user',userRouter)

server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})