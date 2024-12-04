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