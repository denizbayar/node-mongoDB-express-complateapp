const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const response = require('../response');

//Config .env 
dotenv.config();


const verifyToken = (req, res, next)=>{
   //Get token from request header
   const token = req.header('auth-token');
   if(!token) return res.status(401).send('Access Denied');

   try{
    //Verify token with JWT  
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    //If token valid move next 
    next();
   }catch(err){
      
   //Send err if token is not valid
    response.error(res, 'Invalid token.', 400);
   }
}

module.exports = verifyToken;