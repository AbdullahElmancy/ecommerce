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

const productRoute = Router();

productRoute
  .route("/")
  .get(catchAsync(getAllProductsController))
  .post(auth(endPoints.createProduct), catchAsync(createProductController));

productRoute
  .route("/:id")
  .get(auth(endPoints.getProduct), catchAsync(getProductController))
  .patch(auth(endPoints.updateProduct), catchAsync(updateProductController))
  .delete(auth(endPoints.deleteProduct), catchAsync(deleteProductController));
export default productRoute;
