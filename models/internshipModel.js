const mongoose = require('mongoose')

const internshipSchema = new mongoose.Schema({
 profile:String,
 skill:String,
 internshiptype:{
    type:String,
    required:true,
    enum:['In office','Remote','Hybrid']
 },
 internshiptime:{
    type:String,
    required:true,
    enum:['Full-time','Part-time']
 },
 openings:Number,
 from:Date,
 to:Date,
 durations:String,
 responsibility:String,

stipend:{
    status:{
        type:String,
        enum:["Fixed","Negotiable","Performance based","Unpaid"]
    },
    amount:Number,
},
perks:String,
preferences:String,

assesments:String,


},{timestamps:true})


module.exports = mongoose.model('Internship',internshipSchema)