import express from "express";
var cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser());

export const PATH = (__dirname: any): string => {
  const path = __dirname.split("/");
  const newPath = path.slice(0, path.length - 2);
  return newPath.join("/");
};

export const get = (rout: string, filePath: string) => {
  return router.get(rout, async (req, res) => {
    res.contentType("text/html");
    const user_id = req.query.user_id;
    console.log("methods req.query.user_id: ", user_id);

    res.status(200);
    res.sendFile(PATH(__dirname) + `/pages/` + filePath);
  });
};

export const post = (rout: string, func: any) => {
  return router.post(rout, async (req, res) => {
    res.contentType("application/json");
    res.status(200);
    await func(req, res);
  });
};
