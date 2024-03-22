const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');
const Studentschema = mongoose.Schema({
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
        maxLength:[16,"password must be at least 6 characters"]
      }
},{timestamps:true})

Studentschema.pre("save",function(){
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
})
const Student = mongoose.model("Student",Studentschema)

module.exports = Student;