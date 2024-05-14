import jwt from "jsonwebtoken";
import Admin from "../users/users.model.js";

/*export const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "|| NO HAY TOKEN EN LA SOLICITUD ||",
    });
  }

  console.log("Token recibido:", token);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("Token decodificado:", decoded);
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

    req.user = adminUsers;
    next();
  } catch (error) {
    console.error("Error al verificar el token JWT:", error);
    return res.status(401).json({
      msg: "Token JWT no válido",
    });
  }
};*/

export const validarJWT = async (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).send("A token is required for authentication");
  }

  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const adminUserso = await Admin.findById(decoded.uid);

    req.user = adminUserso;
  } catch (e) {
    console.log(e);
    return res.status(401).send("Invalid Token");
  }

  return next();
};
