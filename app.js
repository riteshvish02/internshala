require("dotenv").config({path:"./.env"})
const express = require('express');
const app = express();

app.use(require("morgan")("tiny"))
app.use("/",require("./routers/indexRoute"))
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})