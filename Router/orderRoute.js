const express=require("express");
const Router=express.Router();
const auth=require("../middleware/Authorization");
const {GetAllOrder,AddOrder,GetMyOrder, GetOrderByStatus,EditOrder,GetSpecOrders, DeleteMyOrder}=require("../Controller/orderController");

Router.get("/getallorder",GetAllOrder);
Router.post("/addorder",AddOrder);
Router.patch("/editorder/:id",EditOrder);
Router.delete("/deleteorder/:id",DeleteMyOrder);
Router.post("/getorder/:id",GetSpecOrders);
Router.post("getmyorder",GetMyOrder);
Router.post("/getorderbystatus",GetOrderByStatus);
module.exports=Router;