import express from "express";
import createError from "http-errors";
import multer from "multer";
import { getMedia, writeMedia } from "../../lib/fs/tools.js";
import {
  saveMedia,
  findMediaById,
  findMediaByIdAndUpdate,
} from "../../lib/mf/media.js";

const mediaRouter = express.Router();

mediaRouter.post("/", async (req, res, next) => {
  try {
    const imdbID = await saveMedia(req.body);
    res.status(201).send({ imdbID });
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/", async (req, res, next) => {
  try {
    const medias = await getMedia();
    if (req.query && req.query.Title) {
      const filteredMedia = medias.filter(
        (media) => media.Title === req.query.Title
      );
      res.send(filteredMedia);
    } else {
      res.send(medias);
    }
  } catch (error) {
    next(error);
  }
});
mediaRouter.get("/:mediaId", async (req, res, next) => {
  try {
    const media = await findMediaById(req.params.mediaId);
    res.send(media);
  } catch (error) {
    next(error);
  }
});
mediaRouter.put("/:mediaId", async (req, res, next) => {
  try {
    const updatedMedia = await findMediaByIdAndUpdate(
      req.params.mediaId,
      req.body
    );
    res.send(updatedMedia);
  } catch (error) {
    next(error);
  }
});
mediaRouter.delete("/:mediaId", async (req, res, next) => {
  try {
    const medias = await getMedia();

    const remainingMedias = medias.filter(
      (media) => media.imdbID !== req.params.mediaId
    );

    await writeMedia(remainingMedias);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

mediaRouter.post("/:mediaId", async (req, res, next) => {});
mediaRouter.delete("/:mediaId", async (req, res, next) => {});

export default mediaRouter;
