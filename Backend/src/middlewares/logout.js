import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const verifyJwt = async (req, res, next) => {
try{
     const token = req.cookies?.authToken || req.headers["authorization"]?.replace("Bearer ", "");

     if (!token){
        return res
        .status(401)
        .json({ success: false, message: "Unauthorized request: Token missing" });
     }

      const decodedToken =  jwt.verify(token, process.env.ATS)
      
      const user = await User.findOne(decodedToken?._id)
      .select("-password -refreshToken")

     if (!user) {
         return res.status(404).json({ success: false, message: "User not found" });
     }

     req.user =user;
     next()
} catch (error) {
     return res
      .status(401)
      .json({ success: false, message: error.message || "Invalid token" });
}


}