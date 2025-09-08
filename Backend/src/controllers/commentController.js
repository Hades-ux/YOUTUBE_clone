import { Comment } from "../models/comments.js";

const addComment = async (req, res) => {
    try {

        const owner = req.user?._id;
        const video = req.params._id;
        const content = req.body.content;

        if(!owner ){
            throw  new Error ("User not  found")
        }
        if(!video ){
            throw  new Error ("Video  not found")
        }
        if(!content ){
            throw  new Error ("write text to add comment")
        }

        const comment = await Comment.create({
            owner,
            video,
            content
        })

        return res.status(200).json({
            success: true,
            message: "comment post sucessfully",
            comment
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not able to post comment ",
            error: error.message
        })
        
    }

}

const updateComment = async (req, res) => {
    try {

        const {newContent} = req.body;
        const commentId = req.params._id;
        const user = req.user._id;

        if(!user){
            throw new Error("user not found");
        }

        const comment = await Comment.findById(commentId);

        if(!comment){
            throw new Error("comment not found");
        }

        if (!comment.owner.equals(user)) {
         return res.status(403).json({
         success: false,
         message: "You are not authorized to delete this comment",
        })
        }

        comment.content = newContent;
        await Comment.save()

        return res.status(200).json({
            success: true,
            message: "Comment update successfully"
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not able to update comment",
            error: error.message
        });
    }

};

const deleteComment = async (req, res) => {

    try {
          const commentId = req.params._id

          
          const user = req.user._id;
          
        if(!user){
            throw new Error("user not found")
        }
            
            const comment = await Comment.findById(commentId);

        if(!comment){
            throw new Error("Comment not found")
        }

        if (!comment.owner.equals(user)) {
            return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this comment",
            });
        }
          await Comment.findByIdAndDelete(commentId);

          return res.status(200).json({
            success: true,
            message: "comment deleted",
          });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "not able to update comment",
            error: error.message,
        
    });
}

};



export {addComment, updateComment, deleteComment}