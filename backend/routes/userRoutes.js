const express=require("express");
const user= express.Router();

const {addUser,getUser}= require("../controllers/userController")


// user.get("/alluser",(req,res)=>{
//     res.send("hello all users");
// })

user.post("/addUser",addUser);
user.get("/getUser/:id",getUser)


module.exports={user}