import { getMedia, writeMedia } from "../fs/tools.js";
import uniqid from "uniqid";

export const saveNewReview = async (mediaId, newReviewData) => {
  const medias = await getMedia();

  const mediaIndex = medias.findIndex((media) => media.imdbID === mediaId);
  if (mediaIndex !== -1) {
    medias[mediaIndex].reviews.push({
      ...newReviewData,
      _id: uniqid(),
      createdAt: new Date(),
    });

    await writeMedia(medias);
    return medias[mediaIndex];
  } else {
    throw createError(404, ` Media with id ${mediaId} not found!`);
  }
};

export const findReviewByIdAndDelete = async (mediaId, reviewId) => {
  const medias = await getMedia();

  const mediaIndex = medias.findIndex((media) => media.imdbID === mediaId);
  if (mediaIndex !== -1) {
    const lengthBefore = medias[mediaIndex].reviews.length;

    medias[mediaIndex].reviews = medias[mediaIndex].reviews.filter(
      (review) => review._id !== reviewId
    );

    if (lengthBefore === medias[mediaIndex].reviews.length)
      throw createError(404, `Review with id ${reviewId} not found!`);
    await writeMedia(medias);

    return medias[mediaIndex].reviews;
  } else {
    throw createError(404, `Media with id ${mediaId} not found!`);
  }
};
