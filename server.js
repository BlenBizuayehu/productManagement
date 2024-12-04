const express=require("express");
const app=express();
app.use(express.json());
// app.use("/",(req,res)=>{

//     res.send("this is the landing page")
//     }
// );
app.use("/product",require("./productRoute"));

app.use("/order",require("./orderRoute"));

app.listen(5001,()=>{
    console.log("Server is up on port 5001");
});

