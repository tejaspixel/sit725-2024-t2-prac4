import mongoose from "mongoose";

const blogsSchemas=mongoose.Schema({
         image:{
            type:String
        },
        title:{
            type:String,
            require:true
        },
        author:{
            type:String,
            require:true
        },
        date_published:{
            type:Date,
            default:Date.now
        },
        content:{
            type:String
        }
})

export default mongoose.model("blogs",blogsSchemas);