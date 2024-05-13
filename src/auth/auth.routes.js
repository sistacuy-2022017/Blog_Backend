import { Router } from "express";
import { check } from "express-validator";
import { validarcampinos } from "../middlewares/validarCampos.js";
import { login } from "../auth/auth.controller.js"
const routerAuth = Router();

routerAuth.post(
  '/login',
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validarcampinos,
  ],
  login
);

export default routerAuth;