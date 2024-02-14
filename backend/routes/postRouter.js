const express=require("express");
const { addPost, getOnePost,sendExcelFile } = require("../controllers/postController");
const coinPost= express.Router();


coinPost.post("/addPost",addPost);
coinPost.get("/getOnePost/:userId",getOnePost);
coinPost.get("/sendExcelFile/:userId",sendExcelFile);




module.exports={coinPost}