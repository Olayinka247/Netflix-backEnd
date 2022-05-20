import { getMedia, writeMedia } from "../fs/tools.js";
import uniqid from "uniqid";

// *********** Function to create a new media *********************
export const saveMedia = async (newMediaData) => {
  const newMedia = {
    ...newMediaData,
    createdAt: new Date(),
    imdbID: uniqid(),
    reviews: [],
  };

  const medias = await getMedia();
  medias.push(newMedia);
  await writeMedia(medias);

  return newMedia.imdbID;
};

//************ Function To Find All Media *************************/
export const findMedia = () => getMedia();

//************ Function to Find Media BY ID *******************/

export const findMediaById = async (mediaId) => {
  const medias = await getMedia();

  const foundMedia = medias.find((media) => media.imdbID === mediaId);

  if (foundMedia) return foundMedia;
  else throw createError(404, `Media with id ${mediaId} not found!`);
};

//*************************Function to modify/update media ************* */

export const findMediaByIdAndUpdate = async (mediaId, updates) => {
  const medias = await getMedia();

  const index = medias.findIndex((media) => media.imdbID === mediaId);

  if (index !== -1) {
    medias[index] = { ...medias[index], ...updates, updatedAt: new Date() };
    await writeMedia(medias);

    return medias[index];
  } else {
    throw createError(404, `Media with id ${mediaId} not found!`);
  }
};

//***************** Function to Delete media by ID************* */
export const findMediaByIdAndDelete = async (mediaId) => {
  const medias = await getMedia();

  const remainingMedias = medias.filter((media) => media.imdbID !== mediaId);

  if (medias.length === remainingMedias.length)
    throw createError(404, `Media with id ${mediaId} not found!`);

  await writeMedia(remainingMedias);
};
