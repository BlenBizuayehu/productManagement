const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    role:{
        type:String,
        enum:["admin","customer","super admin"],
        default:"customer",
        required:true
    },
    password:{
        type:String,
        required:true
    }

},
{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports=User;