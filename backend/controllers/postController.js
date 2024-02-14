const {Post}= require("../models/Post.model");

const addPost=async(req,res)=>{

    const {
        id,
        userId,
        name,
        title,
        body,
        company
    }=req.body;

    try {

        let payload={
            id,
            userId,
            name,
            title,
            body,
            company
        }

        let newPost= Post.build(payload);
        await newPost.save();

        res.status(200).json({message:"post added successfully"})
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOnePost=async(req,res)=>{

    const {userId}=req.params;

    try {

        let post = await Post.findOne({where:{userId:userId}});

        if(post){
            res.status(200).json({isAvailable:true})
        }else{
            res.status(200).json({isAvailable:false})

        }
        
    } catch (error) {
        
    }

}

module.exports={addPost,getOnePost}