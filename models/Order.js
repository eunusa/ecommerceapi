const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const OrderSchema = new mongoose.Schema(
    {
        userId:{type: String, required:true}, 
        Products:[
            {
                productId:{
                    type:String
                },
                quantity:{
                    type:Number,
                    default: 1, //기본값 1
                }
            }

        ],
        amount : {type:Number, required:true},
        adress : {type:Object, required:true},
        status : {type:String, default:"pending"}
    },
    {timestamps:true}
);


module.exports = mongoose.model("Opder",OrderSchema);
