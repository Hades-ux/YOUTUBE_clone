import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema({

    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },

    content: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema)