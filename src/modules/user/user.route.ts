import { Router} from "express";
import { catchAsync } from "../../utils/catshAsync";
import { blockUserController, changeRole, createUserController, deleteUserController, getAllUserController, getUserController, loginUserController, unBlockUserController, updateUserController } from "./user.controller";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";

const userRoute = Router();

userRoute.post("/register",catchAsync(createUserController))
userRoute.post("/login",catchAsync(loginUserController))
userRoute.get("/all",auth(endPoints.all),catchAsync(getAllUserController))
userRoute.get("/:id",auth(endPoints.getAUser),catchAsync(getUserController))
userRoute.route("/")
                    .delete(auth(endPoints.deleteUser),catchAsync(deleteUserController))
                    .patch(auth(endPoints.updateUser),catchAsync(updateUserController))
userRoute.patch("/block-user/:id",auth(endPoints.blockStatusUser),catchAsync(blockUserController))
userRoute.patch("/unblock-user/:id",auth(endPoints.blockStatusUser),catchAsync(unBlockUserController))
userRoute.patch("/change-role/:id",auth(endPoints.changeRole),catchAsync(changeRole))

export default userRoute