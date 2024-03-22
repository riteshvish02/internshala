require("dotenv").config({path:"./.env"})
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

require("./models/dbconfig").dbconnection()
app.use(require("morgan")("tiny"))
app.use("/",require("./routers/indexRoute"))

const ErrorHandler = require("./utils/ErrorHandler")
const {generatedError} = require("./middlewares/error")
app.all("*",(res,req,next)=>{
    next(new ErrorHandler(`Requested URL NOT Found  ${req.url}`,404))
})
app.use(generatedError)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})