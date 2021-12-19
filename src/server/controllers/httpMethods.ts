import { PrismaClient } from ".prisma/client";
import express from "express";
var cookieParser = require("cookie-parser");
const prisma = new PrismaClient();
const router = express.Router();
router.use(cookieParser());

export const PATH = (__dirname: any): string => {
  const path = __dirname.split("/");
  const newPath = path.slice(0, path.length - 2);
  return newPath.join("/");
};

export const getClear = (rout: string, fileName: string, title: string) => {
  return router.get(rout, async (_req, res) => {
    res.contentType("text/html");
    res.status(200);
    res.render(`pages/${fileName}`, {
      title,
      active: `${fileName}`,
    });
  });
};

export const post = (rout: string, func: any) => {
  return router.post(rout, async (req, res) => {
    res.contentType("application/json");
    res.status(201);
    const ctx = { ...req.query, prisma };
    const args = req.body;
    await func(ctx, args, res);
  });
};

export const get = (rout: string, func: Function, path_render: string) => {
  return router.get(rout, async (req, res) => {
    const ctx = { ...req.query, prisma };
    const args = req.body;

    if (req.query.user_id) {
      const data = await func(ctx, args, res);
      res.render("pages/" + path_render, {
        title: data.nick_name,
        active: path_render,
        data,
      });
    } else {
      return res.redirect("/");
    }
  });
};
