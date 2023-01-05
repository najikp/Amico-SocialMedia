import mongoose from "mongoose";


const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    report:[
      {
        userId:{
          type:mongoose.Types.ObjectId,
          ref:"users"
        },
        reason:String
      }
    ],
    desc: String,
    likes: [],
    image: String,
    video:String,
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);
export default postModel;
