import {registerUser,logoutUser, loginUser, getUser, updateUser} from "../controllers/user.controller.js"

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);

router.route('/userProfile').get(verifyJWT,getUser);
router.route('/update/:id').post(verifyJWT,updateUser);
export default router;
