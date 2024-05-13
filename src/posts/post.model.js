import mongoose, { Schema } from "mongoose";

const PostsSchema = new Schema({
    idUser: {
        type: String,
        ref: "Users",
    },
    userName: {
        type: String,
        ref: "Users",
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postUrl: {
        type: String,
        default: "none",
    },
    commentId: {
        type: String,
        ref: "Comments",
    },
});


export default mongoose.model("Posts", PostsSchema); 
