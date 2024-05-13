import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/validar-cant-peticiones.js";
import usersRoutes from "../src/users/user.routes.js";
import authRoutes from "../src/auth/auth.routes.js";
import postRoutes from "../src/posts/post.routes.js"
import commentRoutes from "../src/coments/comments.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/blog/v1/users";
    this.authPath = "/blog/v1/auth";
    this.postPath = "/blog/v1/posts";
    this.commentsPath = "/blog/v1/comments";
    this.middlewares();
    this.dbConnectionBlog();
    this.routes();
  }

  async dbConnectionBlog() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(apiLimiter);
  }

  routes() {
    this.app.use(this.usersPath, usersRoutes);
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.postPath, postRoutes);
    this.app.use(this.commentsPath, commentRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ||  ${this.port}`);
    });
  }
}

export default Server;
