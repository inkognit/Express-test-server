import { PrismaClient } from ".prisma/client";
import cookieParser from "cookie-parser";
import express from "express";
import { login, userCreate } from "../queries/user";
import { user, user_up } from "../queries/users";
import { get, PATH, post } from "./httpMethods";
const prisma = new PrismaClient();

const router = express.Router();

router.use(cookieParser());

router.use(get("/", "accountPage/mainPage.html"));
router.use(get("/registration", "accountPage/registration.html"));

router.use(post("/create_user", userCreate));

// router.use(post("/user_up", user_up));

router.post("/user_up", async (req, res) => {
  res.contentType("application/json");
  res.status(201);
  const ctx = { ...req.query, prisma };
  const args = req.body;
  await user_up(ctx, args, res);
});

router.get("/about", async (req, res) => {
  const ctx = { ...req.query, prisma };
  const args = req.body;
  const data = await user(ctx, args, res);
  res.render("pages/about", {
    title: "About",
    active: "about",
    data,
  });
});
router.get("/login", async (req, res) => {
  res.contentType("text/html");
  res.status(200);
  const token = req.cookies.auth;
  if (!token) {
    res.sendFile(PATH(__dirname) + `/pages/accountPage/loginPage.html`);
  } else {
    return res.redirect("/");
  }
});

router.post("/login", async (req, res) => {
  res.contentType("application/json");
  res.status(201);
  const ctx = { ...req.query, prisma };
  const args = req.body;
  await login(ctx, args, res);
});

router.post("/exit", async (req, res) => {
  res.clearCookie("auth", {
    domain: req.hostname,
    expires: new Date(0),
    path: "/",
  });
  res.sendStatus(201);
});

export default router;
