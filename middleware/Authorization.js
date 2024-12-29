const jwt=require("jsonwebtoken");
const Keys=require("../config/Keys")
module.exports=async (req,res,next)=>{
    const token=req.header("x-auth-token");
    if(!token){
        return res.status(401).json({msg: "You are not authorized"})
    }
    try {
        const decoded=jwt.verify(token,Keys.jwtSecret);
        const user=decoded.user;
        const userId=user.id;

        res.locals.id=userId;
    } catch (error) {
        
    }
}
module.exports=async(req,res,next)=>{
const data=req.body;
const role=data.userRole;
if(role=="admin"){
    next();
}
else{
    res.status(500).send({msg:"You are not authorized"});
}
}

