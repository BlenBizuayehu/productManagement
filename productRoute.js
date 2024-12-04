const express=require("express");
const {GetAllProduct,AddProduct}=require("./productController");
const Router=express.Router();

Router.get("/getallproduct",GetAllProduct);
Router.post("/addproduct",AddProduct);

module.exports=Router;