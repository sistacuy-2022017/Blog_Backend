
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
