const express = require('express');

const Router = express.Router();
const {
    resume,
    addeducation,
    editeducation
} = require("../controllers/resumecontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.get('/',isAuthenticated,resume );
Router.get('/add-edu',isAuthenticated,addeducation );
Router.get('/edit-edu',isAuthenticated,editeducation );



module.exports = Router;