const express=require("express");
const Order=require("./orderModel");
exports.GetAllOrder=async(req,res)=>{
    try {
        const orderList=await Order.find();
        res.send(orderList);
    } catch (error) {
        res.send(error)
    }

}
exports.AddOrder=async(req,res)=>{
    try {
        const {name,price}=req.body;
        const order=await Order.create({name,price});
        res.send(order);
    } catch (error) {
        res.send(error)
    }
}
exports.EditOrder=async(req,res)=>{
    try {
        const {name,price}=req.body;
        let editOrder=await Order.findByIdAndUpdate(
            req.params.id,
            {name,price},
            {new:true}
        )
        res.send(editOrder);
    } catch (error) {
        res.send(error)
    }
}

exports.DeleteOrder=async(req,res)=>{
    try {
        let deleteOrder=await Order.findByIdAndDelete(
            req.params.id,
        )
        res.send("deleted" + " "+ deleteOrder)
    } catch (error) {
        console.log(error)
    }
}

