import { Router} from "express";
import { catchAsync } from "../../utils/catshAsync";
import { createUserController, deleteUserController, getAllUserController, getUserController, loginUserController, updateUserController } from "./user.controller";

const userRoute = Router();

userRoute.post("/register",catchAsync(createUserController))
userRoute.post("/login",catchAsync(loginUserController))
userRoute.get("/all",catchAsync(getAllUserController))
userRoute.route("/:id").get(catchAsync(getUserController))
                    .delete(catchAsync(deleteUserController))
                    .patch(catchAsync(updateUserController))
export default userRoute