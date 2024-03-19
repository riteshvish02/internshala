const express = require('express');

const Router = express.Router();
const {home} = require("../controllers/home");
Router.get('/',home );


module.exports = Router;