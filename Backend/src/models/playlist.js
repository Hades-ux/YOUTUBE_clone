import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{ timestamps: true })

export const playlist = mongoose.model("Playlist", playlistSchema);
