const Joi = require('@hapi/joi');


const registerValidation = (data)=>{
  
  //Create registration schema
  const registerSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required()
    });
  
   //Check the errors 
   return checkResult(registerSchema,data);
} 

const loginValidation = (data)=>{

    //Create login schema
    const loginSchema = Joi.object({
          email: Joi.string().min(3).required().email(),
          password: Joi.string().min(6).required()
      });

     //Check the errors 
     return checkResult(loginSchema,data);     
  }
  
  //Helper function to check result
  function checkResult(schema,data){
    let {error} = schema.validate(data);
    console.log(error)
    return error !=undefined ? error.details[0].message : null ;  
  }


module.exports = {registerValidation, loginValidation};