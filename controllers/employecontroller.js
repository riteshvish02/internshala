const { catchAsyncError } = require("../middlewares/catchAsyncError");
const {sendtoken} = require("../utils/sendtoken")
const {sendmail} = require("../utils/nodemailer")

const EmployeeModel = require("../models/employemodel");
const ErrorHandler = require("../utils/ErrorHandler");
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path");

exports.home = catchAsyncError(async (req, res) => {
  res.json({ message: 'Secure homepage' });
})

exports.employeesignup = catchAsyncError(async (req, res) => {
      const Employee = await new EmployeeModel(req.body).save();
      sendtoken(Employee,200,res)
//       res.status(200).json(Employee)
})

exports.Currentemployee = catchAsyncError(async (req, res) => {
        const Employee = await EmployeeModel.findById(req.id).exec()
        res.status(200).json(Employee)
  })
  

exports.employeesignin = catchAsyncError(async (req,res,next) => {
        const Employee = await EmployeeModel.findOne({email:req.body.email})
        .select("+password")
        .exec()
        if(!Employee){
          return next(new ErrorHandler("User with this email if not found",404) )
        }
        const isMatch =  Employee.comparepassword(req.body.password)
        if(!isMatch){
           return next(new ErrorHandler("Wrong crendentials",404))
        }
        // console.log(req.body);
        sendtoken(Employee,200,res)

        // res.status(200).json(Employee) 
})

exports.employeesendmail = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findOne({email:req.body.email}).exec();
        if(!Employee){
                return next(new ErrorHandler("User with this email if not found",404) )
        }
        const url = `${req.protocol}://${req.get("host")}/Employee/forget-link/${Employee.id}`
        sendmail(req,res,url,next)
        Employee.resetPasswordToken = "1"
        await Employee.save()
        res.json({Employee,url})
 })
  


exports.employeeforgetlink = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findById(req.params.id).exec();
        if(!Employee){
                return next(new ErrorHandler("User with this email if not found",404) )
        }
        if(Employee.resetPasswordToken == "1"){
                Employee.password = req.body.password;
                Employee.resetPasswordToken = "0"
                await Employee.save();
        }else{
          return next(new ErrorHandler("This link is already used",404) )
        }
        res.json({message:"successfully changed password"})
 })

exports.employeeresetpassword = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findById(req.id).exec();
        if(!Employee){
                return next(new ErrorHandler("User not found",500) )
        }
        Employee.password = req.body.password;
        await Employee.save()
        sendtoken(Employee,200,res)
 })

 exports.employeeupdate= catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true}
        ).exec();
        if(!Employee){
                return next(new ErrorHandler("Employee not found",500) )
        }
       
        await Employee.save()
        res
        .status(200)
        .json(Employee)
 })
 exports.employeeavtar = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findById(req.params.id).exec();
       
        console.log(req.files);
        const file = req.files.avtar
        const modifiedfilename = `resumebuilder-${Date.now()}${path.extname(file.name)}`
        const {fileId,url} = await imagekit.upload({
                file:file.data,
                fileName:modifiedfilename,
        })
        if(Employee.organizationlogo.fileId !== ""){
                await imagekit.deleteFile(Employee.avtar.fileId)
        }
         Employee.avtar = {fileId,url}
         await Employee.save()
         res.status(200).json({success:true,message:"image uploaded Successfully"})
 })


exports.employeesignout = catchAsyncError(async (req, res,next) => {
        res.clearCookie("token")
        res.json({ message: 'SignOut successfully' });
})
