const express=require("express");
const Product=require("../Model/productModel");
const order=require("../Model/orderModel");
exports.GetAllProduct=async(req,res)=>{
    try {
        const productList=await Product.find();
        res.send(productList);
    } catch (error) {
        res.send("error");
    }
}

exports.GetSpecProduct= async(req,res)=>{
    try {
        const reqUser= await User.findById(res.locals.Id);
        if(!reqUser || reqUser.role!="admin"){
            res.status(401).send("User is not valid");
        }
        const product=findById(req.params.id);
        res.send(product);
    } catch (error) {
        res.status(501).send("catch error");
    }
}

exports.AddProduct=async(req,res)=>{
    try {
        const reqUser= await User.findById(res.locals.Id);
        if(!reqUser || reqUser.role!="admin"){
            res.status(401).send("User is not valid");
        }
        const{name, price, quantity}=req.body;
        const product=await Product.create({name,price, quantity});
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
        const reqUser= await User.findById(res.locals.Id);
        if(!reqUser || reqUser.role!="admin"){
            res.status(401).send("User is not valid");
        }
        const {name,price}=req.body;
        let editProduct=await Product.findByIdAndUpdate(
            req.params.id,
            {name,price},
            {new:true}
        )
        res.send(editProduct);
    } catch (error) {
        res.send("error");
    }
}

exports.DeleteProduct=async(req,res)=>{
    try { const reqUser= await User.findById(res.locals.Id);
        if(!reqUser || reqUser.role!="admin"){
            res.status(401).send("User is not valid");
        }
        const product=await Product.findById(req.params.id);
        if(!product){
            res.send("no product found by this id");
        }
        const id=req.params.id;
        if(id==order.orderProduct.productId && order.orserStatus=="pending"){
            res.send("cannot delete a pending order");
        }

        await findByIdAndDelete(id);
        res.send("product deleted");
    } catch (error) {
        res.send("error");
    }
}
