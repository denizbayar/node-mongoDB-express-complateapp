
//Create success response
const success = (res, message, statusCode, results)=>{
    return res.status(statusCode).json({
        message,
        error: false,
        code: statusCode,
        results
    });
}

//Create error response
const error = (res, message, statusCode) =>{
    const errCodes = [400, 401, 404, 403,409, 422, 500];
    const foundedCode = errCodes.find(code => code ==statusCode);

    return res.status(statusCode).json({
        message,
        code:foundedCode ? foundedCode : 500,
        error:true
    });
}


module.exports = {success,error};