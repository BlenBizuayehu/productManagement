const express=require("express");
const Product=require("./productModel")
exports.GetAllProduct=async(req,res)=>{
    try {
        const productList=await Product.find();
        res.send(productList);
    } catch (error) {
        res.send("error");
    }
}
exports.AddProduct=async(req,res)=>{
    try {
        const{name, price}=req.body;
        const product=await Product.create({name,price});
        res.send(product);
    } catch (error) {
        res.json({msg:"error"});
    }
    // const data=req.body;
    // res.send(data);
    // console.log(data.ProductQuantity);
}
exports.EditProduct=async(req,res)=>{
    try {
        const {name,price}=req.body;
        let editProduct=await Product.findByIdAndUpdate(
            req.params.id,
            {name,price},
            {new:true}
        )
        res.send(editProduct);
    } catch (error) {
        res.send("error")
    }
}

