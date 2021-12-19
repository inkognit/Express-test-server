import cookieParser from "cookie-parser";
import express from "express";
import { login, userCreate } from "../queries/user";
import { user, user_up } from "../queries/users";
import { get, getClear, post } from "./httpMethods";

const router = express.Router();

router.use(cookieParser());

router.use(getClear("/", "main", "Main"));
router.use(getClear("/registration", "registration", "Registration"));
router.use(post("/create_user", userCreate));
router.use(post("/login", login));

router.use(get("/user", user, "user"));

router.use(post("/user_up", user_up));

export default router;
