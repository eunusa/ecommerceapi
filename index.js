const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user") // ./routes/user 라우터 저장

dotenv.config();



mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBConnection Successfull!"))
    .catch((err)=>{console.log(err);});
/* connect 정보는 env에 저장 */

app.use(express.json()); // json 연결
app.use("/api/users", userRoute); // userRoute 연결


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
})

/* 여기까지 서버 생성 */