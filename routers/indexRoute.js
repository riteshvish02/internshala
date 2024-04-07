const express = require('express');

const Router = express.Router();
const {home,
    studentsignin,
    studentsignup,
    studentsignout,
    Currentstudent,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavtar
} = require("../controllers/indexcontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.get('/',isAuthenticated,home );

Router.get('/student',isAuthenticated,Currentstudent );
//student signup
Router.post("/student/signup",studentsignup)

//student signin
Router.post("/student/signin",studentsignin)

//student signout
Router.get("/student/signout",isAuthenticated,studentsignout)
Router.post("/student/sendmail",studentsendmail)
Router.post("/student/forget-link/:id",studentforgetlink)
Router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword)
Router.post("/student/update/:id",isAuthenticated,studentupdate)
Router.post("/student/avtar/:id",isAuthenticated,studentavtar)


module.exports = Router;