import usersModel from "../users/users.model.js";
import { generarJWT } from "../helpers/generar-jwt.js";
import bcryptjs from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (!user.stateUser) {
      return res
        .status(400)
        .json({ message: "Usuario no encontrado en la db" });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = await generarJWT(user.id);

    res.status(200).json({ login: "|| Welcome to Program ||", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
