const express=require("express");
const Product=require("./productModel")
exports.GetAllProduct=async(req,res)=>{
    const productList=["chair","table","skirt","shoes","broom"];
    res.send(productList);
}
exports.AddProduct=async(req,res)=>{
    try {
        const{name, price}=req.body;
        const product=await Product.create({name,price});
        res.send(product);
    } catch (error) {
        
    }
    // const data=req.body;
    // res.send(data);
    // console.log(data.ProductQuantity);
}

