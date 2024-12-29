const express=require("express");
const Order=require("../Model/orderModel");
const Product=require("../Model/productModel");
const product = require("../Model/productModel");
const User = require("../Model/UserModel");
const order = require("../Model/orderModel");

exports.GetAllOrder=async(req,res)=>{
    try {
        const user=await User.findById(res.locals.id);
        if(user.role!="Admin"){
            return res.send("You are not authorized");
        }
        const orderList=await Order.find();
        res.send(orderList);
    } catch (error) {
        res.send(error);
    }
}
exports.GetMyOrder=async (req, res)=>{
    try {
        const user=await User.findById(res.locals.id);
        if(user.role!="customer"){
            return res.send("You are not authorized");
        }
        
        const orders=await Order.find({userId:res.locals.id});
        if(!orders){
            return res.send("no orders from this user");
        }
        res.status(201).send(orders);
    } catch (error) {
        res.send("catch error");
    }
}

exports.GetSpecOrders=async(req, res)=>{
    try {
        const user=await User.findById(res.locals.id);
        if(user.role!=("admin"|| "editor") ){
            return res.status(501).send("You are not authorized");
        }
        const userOrder=await Order.findById({userId:req.params.id});
        res.send(userOrder);
    } catch (error) {
        res.send("catch error");
    }
}

exports.AddOrder=async(req,res)=>{
    try {
        const {totalPrice, orderProduct}=req.body;
        const userId=res.locals.id;
        for(const element of orderProduct){
            var product=await Product.findById(element.productId)
        if(!product || element.quantity>product.quantity){
            return res.status(401).send("product not found");
        }}
        const order=await Order.create({userId,totalPrice, orderProduct });
        res.send("order"+" "+ order +" " +"created successfully");    
} catch(error){
    res.send (error);
}
}

exports.EditOrder=async(req,res)=>{
    try {
        const {orderProducts,totalPrice, orderStatus}=req.body;
        const  order=await Order.findById(req.params.id)
        if(order.orderStatus=="pending"){
            return res.send("Pending order can't be edited")
        }
        for(const element of orderProducts){
            var product=await Product.findById(element.productId)
            if(!product||product.quantity<element.quantity){
                res.status(401).send("product not found")
            }
            for(const element of orderProduct){
                const productQuantity=Product.quantity-element.quantity;
                const updateProduct=await Product.findByIdAndUpdate(
                    element.productId,
                {
                    quantity:productQuantity
                },
                {new:true});
            }
        } 
    } catch (error) {
            res.send(error)
        }
        
}

exports.DeleteMyOrder=async(req,res)=>{
    try {
        const userOrder=await Order.findById({userId:req.params.id})
        res.send("deleted" + " "+ userOrder)
    } catch (error) {
        res.send(error);
    }
}

exports.GetOrderByStatus=async (req,res)=>{
    try {
        const user=await User.findById(res.locals.id);
    if(user.role!=("admin"||"editor")){
        return res.status(501).send("not authorized");
    }
    const status=req.body;

    const orders=await Order.find({orderStatus:status});
    res.send(orders);
    } catch (error) {
        res.status(201).send("catch error");
    }
    
}

