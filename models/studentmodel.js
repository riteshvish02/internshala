const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Studentschema = new mongoose.Schema({
    name:{
       required:[true,"Name is required"],
       type:String,
       min:[2,"Name must be have at least 2 characters"],
       max:[20,"Name must be less than 20 characters"]
        },
    email:{
        unique: true,
        type: String,
        required: [true, "email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             'Please fill a valid email address'
            ]
    
      },
      password:{
        type: String,
        select:false,
        required: [true, "password is required"],
        minLength:[6,"password must be at least 6 characters"],
        maxLength:[16,"password must be at most 6 characters"]
      }
},{timestamps:true})

Studentschema.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
})
Studentschema.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

Studentschema.methods.getjwttoken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Student = mongoose.model("Student",Studentschema)

module.exports = Student;