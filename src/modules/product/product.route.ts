import { Router } from "express";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { catchAsync } from "../../utils/catchAsync";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductController,
  ratingProductController,
  updateProductController,
} from "./product.controller";
import { validation } from "../../Middlewares/validate";
import { createProductValidator, deleteProductValidator, getAllProductValidator, getProductValidator, rateProductValidator, updateProductValidator } from "./product.validator";
import upload from "../../Middlewares/upload";

const productRoute = Router();

productRoute
  .route("/")
  .get(validation(getAllProductValidator),catchAsync(getAllProductsController))
  .post(auth(endPoints.createProduct),upload.array("productImage",5),validation(createProductValidator), catchAsync(createProductController));

productRoute.patch("/rate",auth(endPoints.rateProduct),validation(rateProductValidator), catchAsync(ratingProductController))

productRoute
  .route("/:id")
  .get(auth(endPoints.getProduct),validation(getProductValidator), catchAsync(getProductController))
  .patch(auth(endPoints.updateProduct),validation(updateProductValidator), catchAsync(updateProductController))
  .delete(auth(endPoints.deleteProduct),validation(deleteProductValidator), catchAsync(deleteProductController));

export default productRoute;
