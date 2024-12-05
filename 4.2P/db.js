import mongoose from "mongoose";

const ConnectToMongoDb=()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/tezz");
        console.log("Database Connected");
    
    } catch (error) {
        console.log("Database Not Connected");
    }
}

export {ConnectToMongoDb};