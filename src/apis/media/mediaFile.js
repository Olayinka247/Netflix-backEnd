import express from "express";
import { pipeline } from "stream";
import { getMedia } from "../../lib/fs/tools.js";
import { getPDFReadableStream } from "../../lib/fs/pdf-tools.js";

const mediaFileRouter = express.Router();

mediaFileRouter.get("/:mediaId/pdf", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachments; filename=media.pdf");
    const medias = await getMedia();
    const foundmedia = medias.findIndex(
      (media) => media.imdbID === req.params.mediaId
    );
    if (foundmedia === -1) {
      throw new Error("Media not found");
    }
    const media = medias[foundmedia];
    const source = await getPDFReadableStream(media);

    const destination = res;

    pipeline(source, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    next(error);
  }
});

export default mediaFileRouter;
