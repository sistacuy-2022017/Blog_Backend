import { Router } from "express";
import { check } from "express-validator";
import { validarcampinos } from "../middlewares/validarCampos.js";
import { createUser } from "./user.controller.js";
import { validarRoleUser } from "../middlewares/validar-users.js";
const routerUsers = Router();

routerUsers.post(
  "/addUsers",
  [
    check("username", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validarRoleUser,
    validarcampinos,
  ],
  createUser
);

export default routerUsers;