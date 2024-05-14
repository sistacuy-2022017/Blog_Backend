import { response, request } from "express";
import publicationsModel from "./post.model.js";
import usuarioModel from "../users/users.model.js";
import commentModel from "../coments/comments.model.js";

export const createPost = async (req = request, res = response) => {
  const { title, category, description, postUrl } = req.body;

  try {
    const userValidate = req.user;

    if(userValidate.roleUser !== "ADMIN_ROLE") {
      return res.status(401).json({
        message: `The user is not an administrator, does not have permission to perform this action`,
      });
    }

    const post = new publicationsModel({
      idUser: userValidate._id,
      userName: userValidate.username,
      title,
      category,
      description,
      postUrl,
    });

    await post.save();

    res.status(200).json({ msg: "|| post added ||", post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    // Obtener todas las publicaciones
    const posts = await publicationsModel.find();

    // Para cada publicación, obtener sus comentarios
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        // Buscar comentarios asociados a la publicación
        const comments = await commentModel.find({ idPosteo: post._id });
        // Devolver la publicación junto con sus comentarios
        return { ...post.toObject(), comments };
      })
    );

    res.json(postsWithComments);
  } catch (error) {
    console.error("Error al obtener las publicaciones y comentarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
