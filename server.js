require("dotenv").config();
const express=require("express");
const connectDB = require("./config/DB");

const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());

connectDB();
app.use("/product",require("./productRoute"));

app.use("/order",require("./orderRoute"));

app.listen(5003,()=>{
    console.log("Server is up on port 5003");
});

