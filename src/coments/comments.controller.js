import { response, request } from "express";
import commentsModel from "./comments.model.js";
import publicationsModel from "../posts/post.model.js";

export const createComment = async (req = request, res = response) => {
  const { comment } = req.body;
  const { idPost } = req.params;

  try {
    const userValidate = req.user;

    // Crear un nuevo comentario
    const newComment = new commentsModel({
      idUser: userValidate._id,
      userNameCom: userValidate.username,
      comment,
      idPosteo: idPost,
    });

    // Guardar el nuevo comentario y obtener el ID del nuevo documento
    const savedComment = await newComment.save();
    const commentIds = savedComment._id;
    const postId = savedComment.idPosteo;

    // Buscar la publicación y agregar el ID del comentario al array de comentarios
    const post = await publicationsModel.findByIdAndUpdate(
      postId,
      { $push: { commentId: commentIds } }, // Guardar el ID del comentario en el modelo de publicación
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ msg: "Publicación no encontrada" });
    }

    res.status(200).json({ msg: "|| Comment added ||", comment: savedComment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
