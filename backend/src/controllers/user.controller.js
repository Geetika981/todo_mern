import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.finndById(userId);
    if (!user) {
      throw new ApiError(400, "no user exists");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, about, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json(new ApiResponse(400,{},"all stared fields are required"))
    // throw new ApiError(404, "atleast one field is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    return res.status(400).json(new ApiResponse(400,{},"username or email already exists"))
    // throw new ApiError(400, "username or email already exists");
  }
  const user = await User.create({
    username,
    email,
    about,
    password,
  });
  if (!user) {
    return res.status(500).json(new ApiResponse(400,{},"internal error while registering user"))
    throw new ApiError(500, "internal error while registering user");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(500).json(new ApiResponse(400,{},"internal error while registering user"))
    throw new ApiError(500, "internal error while registering user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return res.status(400).json(new ApiResponse(400,{},"all fields are required"))
    throw new ApiError(400, "all fields are required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return res.status(400).json(new ApiResponse(400,{},"all fields are required"))
    throw new ApiError(400, "user does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(400).json(new ApiResponse(400,{},"invalid credentials"))
    throw new ApiError(400, "invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  if (!accessToken || !refreshToken) {
    return res.status(500).json(new ApiResponse(400,{},"internal error while generating access and refresh token"))
    throw new ApiError(
      500,
      "internal error while generating access and refresh token"
    );
  }

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


export { registerUser, loginUser, logoutUser };
