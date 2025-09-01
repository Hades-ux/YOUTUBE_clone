import {User} from "../models/User.js"


const subscribeUser = async (req, res) =>{

    const { channelId } = req.params;  // Id of user to subscibe(string from url)
    const userId = req.user?._id;   // Id of logged in user( objectId from mongoDb)

    if(userId.toString() === channelId ){
        return res.status(400).json({ error: "You cannot subscribe to yourself" });
    }

    try {

        const channel = await User.findById(channelId)

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        const alreadySubscribed = await User.exists({
            _id: userId,
            subscriptions: channelId
        });

       if (alreadySubscribed) {
           return res.status(400).json({ error: "You are already subscribed to this channel" });
       }

        // Add channelId to user's subscriptions

       await User.findByIdAndUpdate(userId, {
           $addToSet: { subscriptions: channelId }
       }, { new: true, validateBeforeSave: false });

       //  Add userId to channel's subscribers

       await User.findByIdAndUpdate(channelId, {
           $addToSet: { subscribers: userId },
           $inc: { subscriberCount: 1 },
       }, { new: true, validateBeforeSave: false });

       return res.status(200).json({ message: "Subscribed successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })

    }
}

const unSubscribeUser = async (req, res) =>{

    const { channelId } = req.params;  // Id of user to unSubscibe(string from url)
    const userId = req.user._id;

    if(userId.toString() === channelId ){
        return res.status(400).json({ error: "You cannot unsubscribe from yourself" });
    }

    try {

        const channel = await User.findById(channelId)

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        const isSubscribed = await User.exists({
            _id: userId,
            subscriptions: channelId
        });

       if (!isSubscribed) {
           return res.status(400).json({ error: "You are not subscribed to this channel" });
       }

        // Remove channelId from user's subscriptions

       await User.findByIdAndUpdate(userId, {
           $pull: { subscriptions: channelId }
       }, { new: true, validateBeforeSave: false });

       //  Remove userId from channel's subscribers

       await User.findByIdAndUpdate(channelId, {
           $pull: { subscribers: userId },
           $inc: { subscriberCount: -1 },
       }, { new: true, validateBeforeSave: false });

       return res.status(200).json({ message: "Unsubscribed successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" })

    }
}

export { subscribeUser, unSubscribeUser }