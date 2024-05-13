import userModel from "./users.model.js";
import bcryptjs from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roleUser } = req.body;

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salt);

    const existingAdmin = await userModel.findOne({ roleUser: "ADMIN_ROLE" });

    var userInsane = null;
    if (!existingAdmin && roleUser === "ADMIN_ROLE") {
      userInsane = new userModel({
        username,
        email,
        password: passwordHash, // Guardar la contraseña encriptada
        roleUser,
      });
      await userInsane.save();
      return res.status(200).json({ msg: "|-- User added --|", userInsane });
    } else if (existingAdmin && roleUser === "ADMIN_ROLE") {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con rol ADMIN_ROLE" });
    } else if (roleUser === "USER_ROLE") {
      userInsane = new userModel({
        username,
        email,
        password: passwordHash, // Guardar la contraseña encriptada
        roleUser,
      });
      await userInsane.save();
      return res.status(200).json({ msg: "|-- User added --|", userInsane });
    } else {
      return res.status(400).json({ message: "Rol de usuario no válido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
