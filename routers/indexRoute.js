const express = require('express');

const Router = express.Router();
const {home,studentsignin,studentsignup,studentsignout} = require("../controllers/indexcontroller");
Router.get('/',home );

//student signup
Router.post("/student/signup",studentsignup)

//student signin
Router.post("/student/signin",studentsignin)

//student signout
Router.get("/student/signout",studentsignout)

module.exports = Router;