import mongoose from 'mongoose'

const commentSchema=mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    likes:[{type:mongoose.Types.ObjectId,ref:'users'}],
    author:{type:mongoose.Types.ObjectId,ref:'users'},
    postId:{
        type:mongoose.Types.ObjectId,
        ref:'posts'
    }
},{timestamps:true})

const commentModel=mongoose.model('comments',commentSchema);
export default commentModel;