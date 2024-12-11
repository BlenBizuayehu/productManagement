const mongoose=require("mongoose");

const OrderSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }
)
const order=mongoose.model("Order",OrderSchema)

module.exports=order;