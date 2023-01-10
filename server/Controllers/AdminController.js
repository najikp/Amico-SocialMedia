import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminModel from "../Models/adminModel.js";
import UserModel from "../Models/userModel.js";
import PostModel from '../Models/postModel.js'



//Admin Login
export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await AdminModel.findOne({ username: username });
  
      if (admin) {
        const validity = await bcrypt.compare(password, admin.password);
  
        if (!validity) {
          res.status(400).json('Wrong password')
        } else {
          const token = jwt.sign(
            {
              username: admin.username,
              id: admin._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({ admin, token })
        }
      } else {
        res.status(404).json(" Enter Valid Credentials !");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


//Block Users

export const blockUser=async(req,res)=>{
  const id=req.params.id;
  try {
    await UserModel.findByIdAndUpdate(id,{isBlocked:true})
    res.status(202).json('User Blocked')
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}


//Activate Users

export const activateUser=async(req,res)=>{
  const id =req.params.id;
  try {
    await UserModel.findByIdAndUpdate(id,{isBlocked:false});
    res.status(200).json('User Activated')
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

//Get all posts
export const getAllPosts=async(req,res)=>{
  try {
    const response=await PostModel.find().sort({createdAt:-1}).populate('userId')
    console.log(response.report);
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}