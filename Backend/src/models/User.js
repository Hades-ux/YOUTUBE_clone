import mongoose from 'mongoose';
import bcrypt from  'bcryptjs';
import jwt from 'jsonwebtoken';

const  userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true

    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password:{
        type: String,
        required: true,
        minlength: 6,
    },


    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

     avatar: {
        url: { type: String, required: true },       
        public_id: { type: String, required: true },
     },

    coverImage: {
        url: { type: String },
        public_id: { type: String },
    },

    watchHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Video"
    }],

    refreshToken: {
        type: String,
    }

},{timestamps: true});

userSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        return next();
    }
     try{
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }catch(error){
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function() {
    const Authtoken = jwt.sign({id: this._id}, process.env.ATS, {expiresIn: process.env.ATE});
    return Authtoken;
}

userSchema.methods.generateRefreshToken = function(){
    const refreshToken = jwt.sign({id: this._id}, process.env.RTS, {expiresIn: process.env.RTE});
    return refreshToken;

}

export const User = mongoose.model("User", userSchema);