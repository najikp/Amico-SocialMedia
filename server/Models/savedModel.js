import mongoose from 'mongoose';

const savedShema=mongoose.Schema({
    post:{
        type:mongoose.Types.ObjectId,
        ref:'posts'
    },

    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

const SavedModel=mongoose.model('saves',savedShema);

export default SavedModel;