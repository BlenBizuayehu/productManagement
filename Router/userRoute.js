const express=require("express");
const { Login, UserEdit, ChangePassword, createAccount, EditProfile, ViewProfile, GetAllUsers, DeleteUser } = require("../Controller/userController");
const Authorization = require("../middleware/Authorization");
const Router=express.Router();

Router.post("/login",Login);
Router.get("/getallusers",Authorization,GetAllUsers);
Router.post("/createaccount",createAccount);
Router.patch("/editinfo",Authorization,EditProfile);
Router.patch("/edituser",Authorization,UserEdit);
Router.delete("/deleteaccount",Authorization,DeleteUser);
Router.get("/viewprofile",Authorization,ViewProfile);
Router.get("/changepassword",Authorization,ChangePassword);
module.exports=Router;