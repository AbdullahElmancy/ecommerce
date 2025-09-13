import { Router} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { blockUserController, changeRole, createUserController, deleteUserController, forgetPasswordTokenController, getAllUserController, getUserController, loginUserController, logOutController, refreshTokenController, restPasswordController, unBlockUserController, updatePasswordController, updateUserController } from "./user.controller";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { validation } from "../../Middlewares/validate";
import { blockUserValidator, changeRoleValidator, createUserValidator, forgetPasswordValidator, getUserValidator, loginUserValidator, restPasswordValidator, unBlockUserValidator, updatePasswordValidator, updateUserValidator } from "./user.validator";

const userRoute = Router();

userRoute.post("/register",validation(createUserValidator),catchAsync(createUserController))
userRoute.post("/login",validation(loginUserValidator),catchAsync(loginUserController))
userRoute.post("/forget-password",validation(forgetPasswordValidator),catchAsync(forgetPasswordTokenController))
userRoute.post("/refresh-token",catchAsync(refreshTokenController))
userRoute.post("/rest-password/:token",validation(restPasswordValidator),catchAsync(restPasswordController))
userRoute.get("/log-out",catchAsync(logOutController))
userRoute.get("/all",auth(endPoints.all),catchAsync(getAllUserController))
userRoute.get("/:id",auth(endPoints.getAUser),validation(getUserValidator),catchAsync(getUserController))
userRoute.route("/")
                    .delete(auth(endPoints.deleteUser),catchAsync(deleteUserController))
                    .patch(auth(endPoints.updateUser),validation(updateUserValidator),catchAsync(updateUserController))
userRoute.patch("/block-user/:id",auth(endPoints.blockStatusUser),validation(blockUserValidator),catchAsync(blockUserController))
userRoute.patch("/unblock-user/:id",auth(endPoints.blockStatusUser),validation(unBlockUserValidator),catchAsync(unBlockUserController))
userRoute.patch("/change-role/:id",auth(endPoints.changeRole),validation(changeRoleValidator),catchAsync(changeRole))
userRoute.patch("/change-password",auth(endPoints.updatePassword),validation(updatePasswordValidator),catchAsync(updatePasswordController))
export default userRoute