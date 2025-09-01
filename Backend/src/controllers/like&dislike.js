import  Video from "../models/Video.js";
const toggleLikeVideo = async (req, res) => {

    const { videoId } = req.params;  // Id of video to like(string from url)
    const userId = req.user._id;     // Id of logged in user( objectId from mongoDb)

    try {

        const video = await Video.findById(videoId);

        if(!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        const alreadyLiked = video.likes.some(id => id.toString() === userId.toString());

        let updatedVideo;


        if(alreadyLiked){
            // Remove like
           updatedVideo = await Video.findByIdAndUpdate(videoId,{
            $pull: { likes: userId },
            $inc: { likeCount: -1 }
           },{ new: true, validateBeforeSave: false})

           return res.status(200).json({
                message: "Like removed",
                likeCount: updatedVideo.likeCount
      });

        }else{
            // add like

            updatedLikes = await Video.findByIdAndUpdate(videoId,{
                $addToSet: {likes: userId},
                $inc: {likeCount: 1}
            }, { new: true, validateBeforeSave: false})

            return res.status(200).json({
                message: "Like added",
                likeCount: updatedVideo.likeCount
            })

        }





    } catch (error) {

        return res.status(500).json({ error: error.message || "Internal server error" });

    }
 
}

export { toggleLikeVideo }