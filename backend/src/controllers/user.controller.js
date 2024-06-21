import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(400, "invalid credentials");
  }
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, about, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }
  if (password.length < 8) {
    throw new ApiError(400, "password must be of 8 characters length");
  }
  if (!email.includes("@")) {
    throw new ApiError(400, "enter a valid email id");
  }



  const user = await User.create({
    username,
    email,
    about,
    password,
    
  });
  if (!user) {
    throw new ApiError(500, "internal error while registering user");
  }
  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!registeredUser) {
    throw new ApiError(500, "internal error while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, registeredUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    throw new ApiError(400, "all fields are required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalud credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  console.log({accessToken,refreshToken});

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logout successfully"));
});

const getUser=asyncHandler(async(req,res)=>{
  // const {id}=req.params;
  // if(req.user._id!==id){
  //   throw new ApiError(400,"Ypu can view your profile only");
  // }
  const user=await User.findById(req.user._id).select("-password -refreshToken");
  
  return res.status(200).json(new ApiResponse(200,user,"user fetched successfully"));
})

export { registerUser, loginUser, logoutUser,getUser };
