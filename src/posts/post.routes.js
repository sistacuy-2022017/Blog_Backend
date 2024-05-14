import { Router } from "express";
import { check } from "express-validator";
import { validarcampinos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../helpers/validar-jwt.js";
import { createPost, getPosts } from "../posts/post.controller.js";
//import { validarRolePermis } from "../middlewares/validar-users.js";
const routerPosts = Router();

routerPosts.post(
  "/createPost",
  [
    check("title", "Title is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    validarJWT,
    validarcampinos,
  ],
  createPost
);

routerPosts.get("/getPosts", [validarcampinos], getPosts);

export default routerPosts;
