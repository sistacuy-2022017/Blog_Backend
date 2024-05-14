import userModel from '../users/users.model.js';

const rolesValidos = ["ADMIN_ROLE", "USER_ROLE"];

export const validarRoleUser = (req, res, next) => {
  const { roleUser } = req.body;

  if (!rolesValidos.includes(roleUser)) {
    return res.status(400).json({
      message: `El rol de usuario || ${roleUser} || no es válido. Los roles válidos son: ${rolesValidos.join(
        ", "
      )}`,
    });
  }

  next();
};

export const validarRolePermis = (req, res, next) => {
  const validateUser = req.user;
  

  if(validateUser !== "ADMIN_ROLE"){
    return res.status(401).json({
      message: `El usuario no es administrador, no tiene permisos para realizar esta acción`,
    });
  }


  // Si el usuario es administrador, continúa con el siguiente middleware
  next();
};
