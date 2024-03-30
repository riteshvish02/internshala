const express = require('express');

const Router = express.Router();
const {home,studentsignin,studentsignup,studentsignout,Currentstudent} = require("../controllers/indexcontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.get('/',isAuthenticated,home );

Router.get('/student',isAuthenticated,Currentstudent );
//student signup
Router.post("/student/signup",studentsignup)

//student signin
Router.post("/student/signin",studentsignin)

//student signout
Router.get("/student/signout",isAuthenticated,studentsignout)

module.exports = Router;