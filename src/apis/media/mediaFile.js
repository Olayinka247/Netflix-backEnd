import express from "express";
import { pipeline } from "stream";
import { findMediaById } from "../../lib/mf/media.js";
import { getPDFReadableStream } from "../../lib/fs/pdf-tools.js";

const mediaFileRouter = express.Router();

// get convert media review and image into pdf
mediaFileRouter.get("/:mediaId/pdf", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachment; filename=media.pdf");
    const media = await findMediaById(req.params.mediaId);
    const source = await getPDFReadableStream(media);
    const destination = res;
    pipeline(source, destination, (error) => {
      if (error) console.log(error);
    });
  } catch (error) {
    next(error);
  }
});

export default mediaFileRouter;
