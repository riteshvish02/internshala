const { catchAsyncError } = require("../middlewares/catchAsyncError");
const {v4:uuidv4} = require("uuid");
const StudentModel = require("../models/studentmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");

exports.resume = catchAsyncError(async (req, res) => {
    const {resume} = await StudentModel.findById(req.id).exec()
    res.status(200).json(resume)
})

exports.addeducation = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    Student.resume.education = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"Education Added Successfully"})
})

exports.editeducation = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    const Index =  Student.resume.education.findIndex((i=>i.id === req.params.id))
    Student.resume.education[Index] = {...Student.resume.education[Index],...req.body}
    await Student.save()
    res.status(200).json({message:"Education Updated successfully"})
})

exports.deleteeducation = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    const filteredEdu =  Student.resume.education.filter((i)=>i.id !== req.params.id)
    // console.log(filteredEdu);
    Student.resume.education = filteredEdu
    await Student.save()
    res.status(200).json({message:"Education deleted successfully"})
})
