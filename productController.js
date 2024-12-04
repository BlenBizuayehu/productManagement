const express=require("express");
exports.GetAllProduct=async(req,res)=>{
    const productList=["chair","table","skirt","shoes","broom"];
    res.send(productList);
}
exports.AddProduct=async(req,res)=>{
    const data=req.body;
    res.send(data);
    console.log(data.ProductQuantity);
}

