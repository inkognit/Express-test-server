import cookieParser from "cookie-parser";
import express from "express";
import { PATH } from "./httpMethods";

const auth = express.Router();
auth.use(cookieParser());

auth.get("/login", async (req, res) => {
  res.contentType("text/html");
  res.status(200);
  const token = req.cookies.auth;
  if (!token) {
    res.sendFile(PATH(__dirname) + `/pages/accountPage/loginPage.html`);
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

export default auth;
