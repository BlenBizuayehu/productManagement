const express=require("express");
orderList=["chair","table"];

exports.GetAllOrder=async(req,res)=>{
    res.send(orderList);

}
exports.AddOrder=async(req,res)=>{
    const data=req.body;
    newOrderList=[...orderList,data];
    console.log(data.price);
    res.send(newOrderList);
}
