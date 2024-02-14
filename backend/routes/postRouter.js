const express=require("express");
const { addPost, getOnePost } = require("../controllers/postController");
const coinPost= express.Router();


coinPost.post("/addPost",addPost);
coinPost.get("/getOnePost/:userId",getOnePost);




module.exports={coinPost}