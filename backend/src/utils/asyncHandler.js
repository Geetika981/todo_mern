const asyncHandler=(fxn)=>async(req,res,next)=>{
    try {
        await fxn(req,res,next);
    } catch (error) {
        res.status(res.status||500).json({
            message:error.message,
            success:false
        })
    }
}

export {asyncHandler};