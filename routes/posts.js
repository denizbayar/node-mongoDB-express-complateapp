const router = require('express').Router();

const verifyToken = require('../shared/middlewares/verifytoken');
const response = require('../shared/response');

//Create route with verifyToken middleware
router.get('/',verifyToken, (req,res)=>{
    const post = {
      title:'Post Title',
      description:'Some Post Description Here.'  
    };
    //Return data if all is fine
     response.success(res, 'OK', 200, post);
})

module.exports=router;