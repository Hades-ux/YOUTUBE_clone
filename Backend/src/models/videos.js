import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    video: {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    },

    thumbnail: {
       url: { type: String, required: true },
       publicId: { type: String, required: true }
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

    duration: {
        type: Number 
    },

    resolution: { 
        type: String 
    },

    isPublic: {
        type: Boolean,
        default: true,
        index: true
    },

    isHidden: {
        type: Boolean,
        default: false,
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
    }

},{ timestamps: true })

export const Video = mongoose.model("Video", videoSchema);
