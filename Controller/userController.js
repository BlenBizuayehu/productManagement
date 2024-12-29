const express=require("express");
const mongoose=require("mongoose");
const {jwtSecret}=require("../config/Keys")
const User=require("../Model/UserModel");
const jwt=require("jsonwebtoken");

exports.createAccount=async(req,res)=>{
    try {
        const input=req.body;
        const {name, phone, age, role, password}=input;
        const userCheck=await User.findOne({phone:phone});
        if(userCheck){
            res.send("Already an account by this number");
            
        }
        else{
            const salt= await bcrypt.genSalt();
            const encryptedPassword=await bcrypt.hash(password,salt);
            const user=await User.create({name, phone, age, role, encryptedPassword});
            res.send("successfully created");
            console.log("user crdeated", user)
        }
    } catch (error) {
        res.send(error)
    }
}

exports.Login=async(req,res)=>{
    try {
        const {phone, password}=req.body;
    const user= await User.findOne({phone:phone});
    if(!user){
        return res.status.send("no user with this phone");
    }

    const isMatch=bcrypt.compare(password,user.password);
    if(isMatch){

        const payload={
            user:{
                id:user.id,
            }
        }

        jwt.sign(payload, jwtSecret, {expiresIn: "30d"},(err,token)=>{
            if(err) throw err;
            res.send("Welcome" + {token:token, user:user});
        });
    }
    else{
        res.send("Invalid phone numebr or password");
    }
    } catch (error) {
        res.status(401).json(error);
    }
    
}

exports.GetAllUsers=async(req,res)=>{
    try {
        const users=await User.find();
        res.send(users);
    } catch (error) {
        res.send(error);
    }
}

exports.DeleteUser=async(req,res)=>{
    try {
        const rwqUser=await User.findById(res.locals.id);
        if(!reqUser|| reqUser.role!="Admin"){
            res.send("user is not valid");
        }
        const phone=req.body.phone;
        const role=req.body.role;
        const user=await User.find({phone:phone});
        if(role=="admin"){
            await User.deleteOne(user);
            res.send("Deleted successfully!")
        }
        else{
            res.send("You are not authorized");
        }
    } catch (error) {
        res.send(error);
    }
    
}

exports.ViewProfile=async(req,res)=>{
    try {
        const phone=req.body.phone;
        const userInfo=await User.find({phone:phone});
        res.send(userInfo);
    } catch (error) {
        res.send(error);
    }
}

exports.EditProfile=async(req,res)=>{
    try {
        const {name, phone, age, role, password}=req.body;
        const userInfo=await updateOne(
            phone,
            {name, phone, age, role, password}
        )
        res.send("Profile Updated!"+ + " "+ userInfo)
    } catch (error) {
        res.send(error)
    }
}

exports.UserEdit=async(req,res)=>{
    try {

        const user=User.findById(req.params.id);
        if(!user){
            return res.status(401).send("user not found");
        }

        const {name,phone,age, role}=req.body;
        let userUpdate=await User.findByIdAndUpdate(
            req.params.id,
            {name,phone, age, role}, 
            { new:true});
    } catch (error) {
        res.send(error);
    }
}

exports.ChangePassword= async (req,res)=>{
    try {
        const user=User.findById(req.params.id);
    if(!user){
        return res.status(401).json("user not found");
    }
    const {newPass,oldPass}=req.body;
    const isMatch= bicrypt.compare(user.password,oldPass);
    if(!isMatch){
        return res.status(401).json("wrong password");
    }

    const salt=await bicrypt.getSalt(10);
    const newPassword= bicrypt.hash(newPass,salt);

    const passwordUpdate= await User.findByIdAndUpdate(
        req.params.id,
        {
            password:newPassword
        },
        {new:true}
    );
    } catch (error) {
        res.status(401).send("unable to update password")
    }
    
}