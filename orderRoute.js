const express=require("express");
const Router=express.Router();
const auth=require("./middleware/Authorization");
const {GetAllOrder,AddOrder}=require("./orderController");

Router.get("/getallorder",auth,GetAllOrder);
Router.post("/addorder",AddOrder);
module.exports=Router;