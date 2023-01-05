import commentModel from "../Models/commentModel.js";
import postModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";

//Comment a post
export const createComment = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    try {
        const { comment } = req.body;

        const newComment = new commentModel({
            author: userId, comment, postId
        })
        await newComment.save()
        const myComment = await UserModel.populate(newComment, { path: "author", select: { "username": 1, "profilePicture": 1 } })
        const user = await UserModel.findById({ _id: userId });
        const data = {
            content: `${user.firstname} ${user.lastname} is commented on your post`,
            time: new Date()
        }
        const postedId = await postModel.findById({ _id: postId });
        const id = postedId.userId.toString()
        console.log(userId, id)
        if (userId !== id) {
            await UserModel.findByIdAndUpdate({ _id: postedId.userId }, { $push: { notifications: data } })
        }
        res.status(201).json(myComment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}


//get Comment

export const getComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const comment = await commentModel.find({ postId }).populate({ path: 'author', select: { "username": 1, "profilePicture": 1 } }).sort({ createdAt: -1 });
        res.status(200).json(comment)
    } catch (error) {
        console.log(error);
        res.status(501).json(error)
    }
}

//delete a comment

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const response = await commentModel.findByIdAndDelete({ _id: commentId });
        res.status(204).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}