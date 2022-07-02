const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        username:{type: String, required:true,unique:true}, //required 필수
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true },
        isAdmin:{
            type:Boolean, //boolean 참과 거짓만 값을 저장하고 나타냄
            default:false, 
        },
        
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema);

// 스키마 정의 https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250