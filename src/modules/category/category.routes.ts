import { Router } from "express";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { catchAsync } from "../../utils/catchAsync";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryController, updateCategoryController } from "./category.controller";
import { validation } from "../../Middlewares/validate";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "./category.validator";

const categoryRoute = Router()

categoryRoute.route("/").post(auth(endPoints.createCategory),validation(createCategoryValidator),catchAsync(createCategoryController))
                        .get(auth(endPoints.GetCategories),catchAsync(getAllCategoriesController))
categoryRoute.route("/:id").get(auth(endPoints.GetCategories),validation(getCategoryValidator),catchAsync(getCategoryController))
                           .patch(auth(endPoints.updateAndDeleteCategory),validation(updateCategoryValidator),catchAsync(updateCategoryController))
                           .delete(auth(endPoints.updateAndDeleteCategory),validation(deleteCategoryValidator),catchAsync(deleteCategoryController))

export default categoryRoute