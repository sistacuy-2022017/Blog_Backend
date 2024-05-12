import jwt from "jsonwebtoken";
import Admin from "../users/users.model.js";
import categoryModel from "../categorias/category.model.js";

export const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "|| NO HAY TOKEN EN LA SOLICITUD ||",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const adminUsers = await Admin.findById(decoded.uid);

    if (!adminUsers) {
      return res.status(401).json({
        msg: "|| EL USUARIO NO TA EN LA BASE DE DATOS BRO:V",
      });
    }

    if (!adminUsers.stateUser) {
      return res.status(401).json({
        msg: "|| TOKEN INVALIDO USUARIO CON ESTADO: FALSE ||",
      });
    }

    req.adminUsers = adminUsers;
    next();
  } catch (error) {
    console.error("Error al verificar el token JWT:", error);
    return res.status(401).json({
      msg: "Token JWT no válido",
    });
  }
};
