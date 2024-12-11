const express=require("express");
const {GetAllProduct,AddProduct, EditProduct}=require("./productController");
const Router=express.Router();

Router.get("/getallproduct",GetAllProduct);
Router.post("/addproduct",AddProduct);
Router.patch("/editproduct/:id",EditProduct)

module.exports=Router;