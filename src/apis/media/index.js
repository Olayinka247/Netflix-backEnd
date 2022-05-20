import express from "express";
import createError from "http-errors";
import multer from "multer";
import { getMedia, writeMedia } from "../../lib/fs/tools.js";
import {
  saveMedia,
  findMediaById,
  findMediaByIdAndUpdate,
  findMediaByIdAndDelete,
} from "../../lib/mf/media.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  checksMediasSchema,
  checkValidationResult,
  checksUpdateMediasSchema,
} from "./mediaValidation.js";

const mediaRouter = express.Router();

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "netflix/media",
    },
  }),
  fileFilter: (req, file, multerNext) => {
    if (file.mimetype !== "image/jpeg") {
      multerNext(createError(400, "Only jpeg or png are allowed!"));
    } else {
      multerNext(null, true);
    }
  },
  limits: { fileSize: 1 * 1024 * 1024 }, // file size
}).single("poster");

mediaRouter.post(
  "/",
  checksMediasSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const imdbID = await saveMedia(req.body);
      res.status(201).send({ imdbID });
    } catch (error) {
      next(error);
    }
  }
);

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
mediaRouter.put(
  "/:mediaId",
  checksUpdateMediasSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const updatedMedia = await findMediaByIdAndUpdate(
        req.params.mediaId,
        req.body
      );
      res.send(updatedMedia);
    } catch (error) {
      next(error);
    }
  }
);
mediaRouter.delete("/:mediaId", async (req, res, next) => {
  try {
    // const medias = await getMedia();

    // const remainingMedias = medias.filter(
    //   (media) => media.imdbID !== req.params.mediaId
    // );

    // await writeMedia(remainingMedias);
    const media = await findMediaByIdAndDelete(req.params.mediaId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

mediaRouter.post(
  "/:mediaId/poster",
  cloudinaryUploader,
  async (req, res, next) => {
    try {
      const media = await findMediaByIdAndUpdate(req.params.mediaId, {
        poster: req.file.path,
      });
      res.send();
    } catch (error) {
      next("error");
    }
  }
);
mediaRouter.delete("/:mediaId", async (req, res, next) => {});

export default mediaRouter;
