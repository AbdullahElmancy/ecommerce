import { Router } from "express";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { catchAsync } from "../../utils/catchAsync";
import { createCategoryController, getAllCategoriesController } from "./category.controller";

const categoryRoute = Router()

categoryRoute.route("/").post(auth(endPoints.createCategory),catchAsync(createCategoryController))
                        .get(auth(endPoints.GetCategories),catchAsync(getAllCategoriesController))

export default categoryRoute