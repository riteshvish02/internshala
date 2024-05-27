const express = require('express');

const Router = express.Router();
const {home,
    employeesignin,
    employeesignup,
    employeesignout,
    Currentemployee,
    employeesendmail,
    employeeforgetlink,
    employeeresetpassword,
    employeeupdate,
    employeeavtar
} = require("../controllers/employecontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.get('/',isAuthenticated,home );

Router.get('/home',isAuthenticated,Currentemployee );
//employee signup
Router.post("/signup",employeesignup)

Router.post("/signin",employeesignin)

Router.get("/signout",isAuthenticated,employeesignout)
Router.post("/sendmail",employeesendmail)
Router.post("/forget-link/:id",employeeforgetlink)
Router.post("/reset-password/:id",isAuthenticated,employeeresetpassword)
Router.post("/update/:id",isAuthenticated,employeeupdate)
Router.post("/avtar/:id",isAuthenticated,employeeavtar)


module.exports = Router;