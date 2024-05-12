import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import usersRoutes from "../src/users/user.routes.js";
import apiLimiter from "../src/middlewares/validar-cant-peticiones.js";


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/blog/v1/users";
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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ||  ${this.port}`);
    });
  }
}

export default Server;
