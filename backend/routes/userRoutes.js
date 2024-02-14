const express=require("express");
const user= express.Router()


user.get("/alluser",(req,res)=>{
    res.send("hello all users");
})


module.exports=user