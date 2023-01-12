import postModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

//Create new Post
export const createPost = async (req, res) => {
  const newPost = new postModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};


//edit a post
export const editPost=async(req,res)=>{
  const postId=req.params.id;

  try {
    const response=await postModel.findByIdAndUpdate({_id:postId},{desc:req.body})
    req.status(200).json({data:response})
  } catch (error) {
    console.log(error)
  }
}
//Save a post
export const savePost=async(req,res)=>{
  const postId=req.params.id;
  const {userId}=req.body;

  try {
    
  } catch (error) {
    console.log(error)
  }


}

//Report a post
export const reportPost=async(req,res)=>{
  const postId=req.params.id;
  const {userId}=req.body;
  const {reason}=req.body;
  
  try {
    const response=await postModel.findByIdAndUpdate({_id:postId},{$push:{report:{userId:userId,reason:reason}}});
    res.status(200).json({message:'Post Reported Successfully'})
  } catch (error) {
    res.status(401).json(error)
    console.log(error)
  }
}

//Get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId=req.user.id;

  try {
    const post = await postModel.findById(postId);
    const postid=post.userId.toString();
    console.log(postid,userId)
    if (postid=== userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action Forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a Post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const post = await postModel.findById(postId);
    const userid = post.userId.toHexString()
    if (userid === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Like and Dislike a Post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  const currentUserId = req.user.id;

  try {
    const post = await postModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      const user = await UserModel.findById({ _id:currentUserId});
      const content = `${user.firstname} ${user.lastname} is liked your post`
      const data = {
        content: content,
        time: new Date()
      }
      const postedId=post.userId.toString();
      if(currentUserId!==postedId){
        await UserModel.findByIdAndUpdate({ _id: post.userId}, { $push: { notifications: data } })
      }
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get Timeline Posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  const LIMIT = 100;
  const skip = Number(req.query.skip) || 0;

  try {
    const timelinePosts = await UserModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPost",
        },
      },
      {
        $project: {
          followingPost: 1,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "userPost",
        },
      },
      {
        $project: {
          _id: 0,
          allPosts: {
            $concatArrays: ["$followingPost", "$userPost"],
          },
        },
      },
      {
        $unwind: {
          path: "$allPosts",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "allPosts.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $project: {
          allPosts: 1,
          "user.username": 1,
          "user.firstname": 1,
          "user.lastname": 1,
          'user.profilePicture': 1,
          'user.coverPicture': 1
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$allPosts", "$user"],
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);
    res
      .status(200)
      .json({ message: "Posts fetched successfully", posts: timelinePosts });
  } catch (error) {
    res.status(500).json(error);
  }
};

