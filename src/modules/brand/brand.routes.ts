import { Router } from "express";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { catchAsync } from "../../utils/catchAsync";
import { createBrandController, deleteBrandController, getAllBrandsController, getBrandController, updateBrandController } from "./brand.controller";
import { validation } from "../../Middlewares/validate";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "./brand.validator";

const brandRoute = Router()

brandRoute.route("/").post(auth(endPoints.createBrand),validation(createBrandValidator),catchAsync(createBrandController))
                        .get(auth(endPoints.GetBrands),catchAsync(getAllBrandsController))
brandRoute.route("/:id").get(auth(endPoints.GetBrands),validation(getBrandValidator),catchAsync(getBrandController))
                           .patch(auth(endPoints.updateAndDeleteBrand),validation(updateBrandValidator),catchAsync(updateBrandController))
                           .delete(auth(endPoints.updateAndDeleteBrand),validation(deleteBrandValidator),catchAsync(deleteBrandController))

export default brandRoute