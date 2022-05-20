import express from "express";

const mediaRouter = express.Router();

mediaRouter.post("/", async (req, res, next) => {});

mediaRouter.get("/", async (req, res, next) => {});
mediaRouter.get("/:mediaId", async (req, res, next) => {});
mediaRouter.put("/:mediaId", async (req, res, next) => {});
mediaRouter.delete("/:mediaId", async (req, res, next) => {});

export default mediaRouter;
