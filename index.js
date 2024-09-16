import express from 'express';
import userRouter from "./router/userRouter.js"
import mongoose from 'mongoose';
const server = express();
server.use(express.json())

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

server.listen(8000,()=>{
    console.log('Server is running on port 8000');
})