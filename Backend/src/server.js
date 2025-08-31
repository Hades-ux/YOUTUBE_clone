import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

import { app } from "./app.js";
import connectDB from "./db/dataBase.js";

const port = process.env.PORT || 5555;

connectDB()
.then(() => {
    app.listen(port,()=>{
        console.log(`Server running on port http://localhost:${port}`);
    })
}).catch((err) => {
    console.log("MONGODB CONNECTION ERROR: ", err);
});