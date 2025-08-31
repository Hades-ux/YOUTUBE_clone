import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },

    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{ timestamps: true })

export const like = mongoose.model("Like", likeSchema);
