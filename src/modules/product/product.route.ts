import { Router } from "express";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { catchAsync } from "../../utils/catchAsync";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
} from "./product.controller";
import { validation } from "../../Middlewares/validate";
import { createProductValidator, deleteProductValidator, getAllProductValidator, getProductValidator, updateProductValidator } from "./product.validator";

const productRoute = Router();

productRoute
  .route("/")
  .get(validation(getAllProductValidator),catchAsync(getAllProductsController))
  .post(auth(endPoints.createProduct),validation(createProductValidator), catchAsync(createProductController));

productRoute
  .route("/:id")
  .get(auth(endPoints.getProduct),validation(getProductValidator), catchAsync(getProductController))
  .patch(auth(endPoints.updateProduct),validation(updateProductValidator), catchAsync(updateProductController))
  .delete(auth(endPoints.deleteProduct),validation(deleteProductValidator), catchAsync(deleteProductController));
export default productRoute;
