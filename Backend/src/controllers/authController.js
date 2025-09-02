import { User } from "../models/User.js"
import { uploadFile } from "../utils/uploadFile.js";
import jwt from "jsonwebtoken";
import { generateAuthTokenAndRefreshToken } from "../utils/genrateToken.js";

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
        const avatar = await uploadFile(avatarPath);
        const coverImage = coverImagePath ? await uploadFile(coverImagePath) : null;


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

        // auto-login
        const { authToken, refreshToken } = await generateAuthTokenAndRefreshToken(user._id)

        // set cookies
        const option ={
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict"
        }


        // remove sensitive information
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        // check for user creation

        if (!createdUser) {
            throw new Error("User creation failed");
        }

        // return response

      res.status(201).json({ message: "User registered successfully" });
    }catch (error) {

    console.error("Registration error:", error);
    return res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

const loginUser = async (req, res) =>{
try{
    // get user data from body

    const { email, password } = req.body;

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
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
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

const refreshToken = async (req, res) =>{
    
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

const forgotPassword = async (req, res) => {
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

const changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        const user = await User.findById(req.user?._id);

        if(!user){
            throw new Error("User not found");
        }

        const isMatch = await user.comparePassword(oldPassword);

        if(!isMatch){
            throw new Error("Old Password is incorrect");
        }

        user.password = newPassword;
        await user.save({validateBeforeSave: false});

    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
}

export { registerUser, loginUser, logoutUser, refreshToken, forgotPassword, changePassword };