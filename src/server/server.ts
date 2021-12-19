import cookieParser from "cookie-parser";
import express, { Express } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { env } from "process";
import auth_router from "./controllers/auth_router";
import routes from "./controllers/routes";

require("dotenv").config();

const app: Express = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.cookies.auth) {
    const payload = Object.assign(jwt.decode(req.cookies.auth) as object);
    req.query = { ...payload };
  }

  next();
});
app.use("/", routes);
app.use("/", auth_router);

const PORT = env.PORT ?? 4200;

app.listen(PORT, () =>
  console.log(
    `\n \u2705 - The Server is running!\nNODE_ENV = ${env.NODE_ENV}\nhttp://localhost:` +
      PORT
  )
);
