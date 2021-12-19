import cookieParser from "cookie-parser";
import express from "express";
import { login, userCreate } from "../queries/user";
import { getClear, post } from "./httpMethods";

const auth = express.Router();
auth.use(cookieParser());

auth.get("/login", async (req, res) => {
  res.contentType("text/html");
  res.status(200);
  const token = req.cookies.auth;
  if (!token) {
    res.render(`pages/login`, {
      title: "Auth",
      active: `login`,
    });
  } else {
    return res.redirect("/");
  }
});

auth.post("/exit", async (req, res) => {
  res.clearCookie("auth", {
    domain: req.hostname,
    expires: new Date(0),
    path: "/",
  });
  res.sendStatus(201);
});

auth.use(getClear("/registration", "registration", "Registration"));
auth.use(post("/create_user", userCreate));
auth.use(post("/login", login));
export default auth;
