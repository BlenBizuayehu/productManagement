const { raw } = require("express");
const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
});
const product=mongoose.model("Product",productSchema);

module.exports=product;