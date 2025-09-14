import { Router } from "express";
import { auth } from "../../Middlewares/auth";
import { endPoints } from "./endpoints";
import { validation } from "../../Middlewares/validate";
import { createBlogValidator, deleteBlogValidator, getAllBlogValidator, getBlogValidator, updateBlogValidator, updateImageBlogValidator } from "./blog.validator";
import { catchAsync } from "../../utils/catchAsync";
import { createBlogController, deleteBlogController, getAllBlogsController, getBlogController, updateBlogController, updateBlogImageController } from "./blog.controller";
import upload from "../../Middlewares/upload";

const blogRoute = Router();
blogRoute.route("/").post(auth(endPoints.createBlog),upload.single("image"),validation(createBlogValidator),catchAsync(createBlogController))
                    .get(auth(endPoints.getBlogs),validation(getAllBlogValidator),catchAsync(getAllBlogsController))
blogRoute.route("/:id").get(auth(endPoints.getBlogs),validation(getBlogValidator),catchAsync(getBlogController))
                       .delete(auth(endPoints.deleteBlog),validation(deleteBlogValidator),catchAsync(deleteBlogController))
                       .patch(auth(endPoints.updateBlog),validation(updateBlogValidator),catchAsync(updateBlogController))
blogRoute.patch("/update-image/:id",auth(endPoints.updateBlog),upload.single("image"),validation(updateImageBlogValidator),catchAsync(updateBlogImageController))
export default blogRoute