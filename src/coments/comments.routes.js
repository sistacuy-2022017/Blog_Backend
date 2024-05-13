import { Router } from "express";
import { check } from "express-validator";
import { validarcampinos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../helpers/validar-jwt.js";
import { createComment } from './comments.controller.js';
const routerComments = Router();

routerComments.post(
    "/createComment/:idPost",
    [
        check("comment", "Comment is required").not().isEmpty(),
        validarJWT,
        validarcampinos,
    ],
    createComment
);

export default routerComments;