import cookieParser from "cookie-parser";
import express from "express";
import { login, userCreate } from "../queries/user";
import { user, user_up } from "../queries/users";
import { get, post } from "./httpMethods";

const router = express.Router();

router.use(cookieParser());

// router.use(getClear("/", "accountPage/mainPage.html"));
// router.use(getClear("/registration", "accountPage/registration.html"));

router.use(get("/user", user, "user"));

router.use(post("/create_user", userCreate));
router.use(post("/user_up", user_up));
router.use(post("/login", login));

router.get("/registration", async (req, res) => {
  res.render("pages/registration", {
    title: "Registration",
    active: "registration",
  });
});

router.get("/", async (req, res) => {
  res.render("pages/main", {
    title: "Main",
    active: "main",
  });
});

export default router;
