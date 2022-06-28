const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();



mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBConnection Successfull!"))
    .catch((err)=>{console.log(err);});
/* connect 정보는 env에 저장 */


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
})

/* 여기까지 서버 생성 */