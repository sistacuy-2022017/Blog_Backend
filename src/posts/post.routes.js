import { Router } from "express";
import { check } from "express-validator";
import { validarcampinos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../helpers/validar-jwt.js";
import { createPost } from '../posts/post.controller.js';
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

export default routerPosts;