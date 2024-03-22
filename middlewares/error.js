exports.generatedError = (err,res,req,next)=>{
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({message:err.message,errName:err.name});
}