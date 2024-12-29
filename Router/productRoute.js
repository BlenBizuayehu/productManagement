const express=require("express");
const {GetAllProduct,AddProduct, EditProduct, DeleteProduct,GetSpecProduct}=require("../Controller/productController");
const Router=express.Router();
const Authorization=require("../middleware/Authorization")

Router.get("/getallproduct",GetAllProduct);
Router.post("/addproduct",Authorization,AddProduct);
Router.patch("/editproduct/:id",Authorization,EditProduct)
Router.patch("/getproduct",Authorization, GetSpecProduct);
Router.delete("/deleteproduct",Authorization,DeleteProduct)
module.exports=Router;