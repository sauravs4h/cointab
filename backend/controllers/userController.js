const { User } = require("../models/User.model");

const addUser = async (req, res) => {
  const { id, name, email, phone, website, city, company } = req.body;

  try {
    let payload = {
      id,
      name,
      email,
      phone,
      website,
      city,
      company,
    };

    const newuser = User.build(payload);
    await newuser.save();

    res.status(200).json({message:"user Added successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser=async(req,res)=>{
    const {id}=req.params;

    try {

      console.log("id",id)
        const findUser= await User.findOne({where:{id:id}});

        if(findUser){
          res.status(200).json({isUser:true,message:"user found",user:findUser})
          return;
        }else{
          res.status(200).json({isUser:false,message:"user not found"})
          return;
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={addUser,getUser}
