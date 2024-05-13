import { response, request } from "express";
import publicationsModel from "./post.model.js";
import usuarioModel from "../users/users.model.js";
//import commentModel from "../coments/comments.model.js";

export const createPost = async (req = request, res = response) => {
  const { title, category, description, postUrl } = req.body;

  try {
    const userValidate = req.user;

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
