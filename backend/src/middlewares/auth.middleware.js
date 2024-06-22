import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const verifyJWT=asyncHandler(async(req,res,next)=>{
    const token=req.cookies?.accessToken;
    if(!token){
        throw new ApiError(400,"Unauthorized Accessss");
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken){
        throw new ApiError(400,"Unauthorized Access")
    }

    const user=await User.findById(decodedToken?._id).select("-password -refershToken");
    if(!user){
        throw new ApiError(400,"Unauthorized Access")
    }
    req.user=user;
    next();
})

export {verifyJWT};