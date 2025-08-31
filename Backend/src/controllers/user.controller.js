import  { User } from "../models/User.js";
import { uploadImage } from "../utils/uploadImage.js";
import jwt from "jsonwebtoken";

 const generateAuthTokenAndRefreshToken = async (userId) =>{

        try{
            const user = await User.findById(userId);
            if(!user){
                throw new Error("User not found");
            }
            const authToken = user.generateAuthToken();
            const refreshToken = user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save({validateBeforeSave: false});

            return { authToken, refreshToken };

        }catch(error){
            throw new Error("Error generating tokens");
        }
}

const registerUser = async (req, res) =>{
    try {
        // get user details from front end.
        const { fullName, email, password, userName } = req.body;
        
        // validation
        if(!email|| !userName || !password || !fullName){
            throw new Error("Full Name, Email, Username, and Password are required");

        }
        // check user already exists: email and username
          const userExist = await User.findOne({ $or: [{ email }, { userName }]})
          if(userExist){
            throw new Error("User or Email already exists")
          }

        // check for images and avatar

        const coverImagePath = req.files?.coverImage?.[0]?.path;
        const avatarPath = req.files?.avatar?.[0]?.path;

        if(!avatarPath){
            throw new Error(" Avatar image is required")
        }

        // upload them on cloudinary, avatar

        const avatar = await uploadImage(avatarPath);
        const coverImage = coverImagePath ? await uploadImage(coverImagePath) : null;


        if(!avatar){
            throw new Error("Error uploading avatar")
        }

        // create user in database

        const user = await User.create({
            fullName,
            email,
            password,
            userName: userName.toLowerCase(),
            avatar: {
                url: avatar.secure_url,
                public_id: avatar.public_id
            },
            coverImage: {
                url: coverImage?.secure_url || "",
                public_id: coverImage?.public_id || ""
            }
        })

        // remove sensitive information

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        // check for user creation

        if (!createdUser) {
            throw new Error("User creation failed");
        }

        // return response

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
}

const loginUser = async (req, res) =>{
try{
    // get user data from body

    const {email, password} = req.body;

    // validate input
    if(!email || !password){
       return res.status(400).json({ success: false, message: "Email and password are required" });
    }


    //find user
    const user = await User.findOne({email})
    if(!user){
       return res.status(404).json({ success: false, message: "User not found" });
    }




    // compare password
    const validPassword = await user.comparePassword(password);
    if(!validPassword){
        return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // access and refresh token

   const {authToken, refreshToken} = await generateAuthTokenAndRefreshToken(user._id)

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // send cookies

    const option ={
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
    .status(200)
    .cookie("authToken", authToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json({
    success: true,
    message: "Login successful",
    user: loggedInUser,
    authToken,
    refreshToken
  });

  
  
}catch(error){
    res.status(500).json({ error: error.message || "Internal server error" });
}

}
const logoutUser = async (req, res) =>{
  try{
    if(req.user?._id){
      await User.findByIdAndUpdate(req.user._id,
           { $unset: { refreshToken: "" } });
    }

      const option = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    };

    res.clearCookie("authToken", option);
    res.clearCookie("refreshToken", option);

    return res
    .status(200)
    .json({ message: "Logout successful" });

  }catch(error){
      res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const  refreshToken = async (req, res) =>{
    
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

        if(!incomingRefreshToken){
         throw new Error("Unauthorized: Refresh token missing");
        }

      try{ const decodedToken =  jwt.verify(incomingRefreshToken, process.env.RTS)

      const user = await User.findById(decodedToken?._id)

      if (!user){
        throw new Error("Unauthorized: Invalid refresh token");
      }

      if(incomingRefreshToken !== user.refreshToken){
        throw new Error("Unauthorized: refresh token is expired");
      }

      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      };

      const {authToken, newRefreshToken} = await generateAuthTokenAndRefreshToken(user._id)

      return res
      .status(200)
      .cookie("authToken", authToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        success: true,
        message: "Token refreshed successfully",
        authToken,
        refreshToken: newRefreshToken
      });

    }catch(error){
      return res.status(500).json({ error: error.message || "Internal server error" });

    }
}

const  forgotPassword = async (req, res) => {
  try{
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?.id);

    if(!user){
      throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(oldPassword);

    if(!isMatch){
      throw new Error("Old Password is incorrect");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res.status(200).json({ message: "Password changed Successfully"});

  }catch(error){
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const currentUser = async (req, res) =>{
  try{

    const user = await User.findById(req.user?._id)

    return res.status(200).json({ user, message: "User fetched successfully" });

  }catch(error){
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const UpdateUser = async (req, res) => {
  try{

    const { fullName, email } = req.body;

    if(!fullName || !email){
      throw new Error("Full Name and Email are required");
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
      { $set:{ fullName, email } },{ new: true }).select("-password");

  return res.status(200).json({ user, message: "User details updated successfully" });

  }catch(error){
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const UpdateUserAvatar = async (req, res) =>{

  try {

    const newAvatarPath = req.file?.path;

    if (!newAvatarPath) {
      return res.status(400).json({ error: "Avatar is required" });
    }

    const newAvatar = await uploadImage(newAvatarPath);

    if(!newAvatar.secure_url || !newAvatar.public_id){
      throw new Error("Avatar upload failed");
    }

    //  find user

    const user = await User.findById(req.user._id);
      if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // delete old avatar

    if(user.avatar && user.avatar.public_id){
        await deleteOldImage(user.avatar.public_id);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set:{ avatar: { url: newAvatar.secure_url, public_id: newAvatar.public_id } } },{ new: true }).select("-password");

    return res.status(200).json({ message: "Avatar updated successfully", user: updatedUser });

  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }

}
const UpdateUserCoverImage = async (req, res) =>{

  try {

    const coverImagePath = req.file?.path;

    if (!coverImagePath) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    const coverImage = await uploadImage(coverImagePath);

    if(!coverImage.secure_url){
      throw new Error("Cover image upload failed");
    }

    await User.findByIdAndUpdate(req.user?._id, { $set:{ coverImage: coverImage.secure_url } },{ new: true }).select("-password");

    return res.status(200).json({ message: "Cover image updated successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }

}

export {registerUser, loginUser ,logoutUser, refreshToken, forgotPassword, currentUser, UpdateUser, UpdateUserAvatar, UpdateUserCoverImage};