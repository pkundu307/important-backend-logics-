import jwt from 'jsonwebtoken';
const JWT_SECRET="PRASANNA"

// this  is middleware
export const authenticateTokenDecode = (req,res,next)=>{
    const authHeader = req.headers['authorization'];

    const token =authHeader && authHeader.split(' ')[1];// this is a general way to get the token
    // console.log(token,'<-----');
    
    // from 'Bearer<token>'
    if(!token){
        return res.status(401).json({message: 'Authorization denied'});

    }
    try {
        const decode=jwt.verify(token,JWT_SECRET);
        console.log(decode,'<-----');
        req.user=decode;
        next();
    } catch (error) {
        res.status(error.statusCode).json({message:'invalid token'});
    }

}

//main point of using jwt token 

// not sending sensetive information in payload
