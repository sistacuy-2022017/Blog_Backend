import { config } from "dotenv";
config();

import serversito from "./configs/server.js";

const serverBlog = new serversito();

serverBlog.listen();