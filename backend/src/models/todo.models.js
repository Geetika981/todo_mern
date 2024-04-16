import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Todo=mongoose.model("Todo",todoSchema);