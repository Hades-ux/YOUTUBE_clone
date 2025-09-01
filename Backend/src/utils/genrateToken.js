 const generateAuthTokenAndRefreshToken = async (userId) =>{

        try{
            const user = await User.findById(userId);
            if(!user){
                throw new Error("User not found");
            }
            const authToken = user.generateAuthToken();
            const refreshToken = user.generateRefreshToken();


            if (!Array.isArray(user.refreshTokens)) {
            user.refreshToken = [];
    }

            user.refreshToken.push(refreshToken)
            
            await user.save({validateBeforeSave: false});

            return { authToken, refreshToken };

        }catch(error){
            throw new Error("Error generating tokens");
        }
}

export { generateAuthTokenAndRefreshToken }