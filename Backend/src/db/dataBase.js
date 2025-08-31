import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";


const connectDB = async () =>{
    try{
       const connectionInst =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST:${connectionInst.connection.host}`)
    }catch(err){
        console.error("ERROR: ", err);
        process.exit(1);
    }
}

export default connectDB;

// import  express from 'express';
// const app = express();

// ; ( async () =>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("Error", (err) => {
//             console.error("ERROR: ", err)
//             throw err;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server started on port ${process.env.PORT}`)
//         })


//     }catch(err){
//         console.error("ERROR: ",err)
//         throw err
//     }

// })()