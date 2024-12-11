const express=require("express");
const Router=express.Router();
const auth=require("./middleware/Authorization");
const {GetAllOrder,AddOrder,EditOrder,DeleteOrder}=require("./orderController");

Router.get("/getallorder",GetAllOrder);
Router.post("/addorder",AddOrder);
Router.patch("/editorder/:id",EditOrder);
Router.delete("/deleteorder/:id",DeleteOrder)
module.exports=Router;