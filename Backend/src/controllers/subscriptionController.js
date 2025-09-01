import {User} from "../models/User.js"


const toggleSubscriberUser = async (req, res) =>{

    const { channelId } = req.params;  // Id of user to unSubscibe(string from url)
    const userId = req.user._id;       // Id of logged in user( objectId from mongoDb)

    if(userId.toString() === channelId ){
        return res.status(400).json({ error: "You cannot unsubscribe from yourself" });
    }

    try {

        const channel = await User.findById(channelId)

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        const user = await User.findById(userId);

        const isSubscribed = user.subscriptions.some(id => id.toString() === channelId);

        let updatedChannel;

       if (!isSubscribed) {

           
         await User.findByIdAndUpdate(userId,{
            $addToSet: { subscriptions: channelId},
         },{ new: true, validateBeforeSave: false})
            
        updatedChannel = await User.findByIdAndUpdate(channelId,{
            $addToSet: { subscribers: userId},
            $inc : { subscriberCount: 1 }
        },{ new: true, validateBeforeSave: false})

        return res.status(200).json({
            message: "Subscribed sucessfully",
            subscriberCount: updatedChannel.subscriberCount
        })
           
       }else{

           
           await User.findByIdAndUpdate(userId,{
               $pull: { subscriptions: channelId},
            },{ new: true, validateBeforeSave: false})
            
            updatedChannel = await User.findByIdAndUpdate(channelId,{
                $pull: { subscribers: userId},
                $inc : { subscriberCount: -1 }
            },{ new: true, validateBeforeSave: false})
    
        return res.status(200).json(
           { message: "Unsubscribed successfully",
            subscriberCount: updatedChannel.subscriberCount
            });

       }


    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" })

    }

}

export { toggleSubscriberUser }