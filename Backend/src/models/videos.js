import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    video: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },

    thumbnail: {
       url: { type: String, required: true },
       public_id: { type: String, required: true }
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    title: {
        type: String,
        required: true,
        index: true
    },

    description: {
        type: String,
    },

    views: {
        type: Number,
        default: 0
    },

    isPublic: {
        type: Boolean,
        default: true,
        index: true
    },

    isDeleted: {
          type: Boolean,
          default: false,
          index: true
    },

    tags:[{
        type: String,
        required: true,
        index: true
    }],

    category: {
         type: String,
        index: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    }],

    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },

    likeCount: {
        type: Number,
        default: 0
    }

},{ timestamps: true })

export const Video = mongoose.model("Video", videoSchema);
