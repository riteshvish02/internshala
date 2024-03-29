const { catchAsyncError } = require("../middlewares/catchAsyncError");
const {sendtoken} = require("../utils/sendtoken")

const StudentModel = require("../models/studentmodel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.home = catchAsyncError(async (req, res) => {
  res.json({ message: 'welcome to internshala' });
})

exports.studentsignup = catchAsyncError(async (req, res) => {
      const Student = await new StudentModel(req.body).save();
      sendtoken(Student,200,res)
//       res.status(200).json(Student)
})

exports.studentsignin = catchAsyncError(async (req,res,next) => {
        const Student = await  StudentModel.findOne({email:req.body.email})
        .select("+password")
        .exec()
        if(!Student){
          return next(new ErrorHandler("User with this email if not found",404) )
        }
        const isMatch =  Student.comparepassword(req.body.password)
        if(!isMatch){
                return next(new ErrorHandler("Wrong crendentials",404))
        }
        // console.log(req.body);
        sendtoken(Student,200,res)

        // res.status(200).json(Student) 
})

exports.studentsignout = catchAsyncError(async (req, res,next) => {
        res.json({ message: 'internshala' });
})
