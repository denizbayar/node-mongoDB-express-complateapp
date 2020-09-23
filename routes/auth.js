const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validation = require('../shared/validation');
const response = require('../shared/response');

const User = require('../model/User');


router.post('/register', async (req, res)=>{
    
    //Validate request data
    const errorMsg = validation.registerValidation(req.body);
     if(errorMsg) return res.status(400).json(response.error(res, errorMsg, 400));
    
     //Encode user password with bcrypt
     const salt = await bcrypt.genSalt();
     const encPass= await bcrypt.hash(req.body.password, salt);

     const user = new User({
         ...req.body,
         password: encPass,
     })

    try{
        //Check if user exist
        const userInDb = await User.findOne({email:req.body.email})
        if(userInDb) return response.error(res, 'User already exist.', 409);
    
        //Save user to DB
        const savedUser = await user.save();
        response.success(res,'User saved successfully.', 201, savedUser);
        
    }catch(err){
        response.error(res,'Error',400);
    }
    
})

router.post('/login', async (req,res)=>{

    //Validate request data
    const errorMsg = validation.loginValidation(req.body);
     if(errorMsg) return response.error(res, errorMsg, 409);
    
    //Find username in database and handle possible errors
    const user = await User.findOne({email:req.body.email});
    if(!user) 
    return response.error(res,'User not found.', 404);

    //check if the password is correct and handle errors
    if(user && !await bcrypt.compare(req.body.password, user.password)) 
    return response.error(res, 'Username or password is not correct.', 401);

    //Create and assign a token
    const token = jwt.sign({_id:user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    //If all is fine return success and login
    response.success(res,'User logged in successfully.', 200);     
})

module.exports = router;