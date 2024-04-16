const express = require('express');

const Router = express.Router();
const {
    resume,
    addeducation,
    editeducation,
    deleteeducation
} = require("../controllers/resumecontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.post('/',isAuthenticated,resume );
Router.post('/add-edu',isAuthenticated,addeducation );
Router.post('/edit-edu/:id',isAuthenticated,editeducation );
Router.post('/del-edu/:id',isAuthenticated,deleteeducation);



module.exports = Router;