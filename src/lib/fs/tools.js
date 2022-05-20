import fs from "fs-extra";
import { join } from "path";

const { writeJSON, readJSON } = fs;

const dataFolderPath = join(process.cwd(), "./src/data");
const mediaJsonPath = join(dataFolderPath, "media.json");

export const getMedia = () => readJSON(mediaJsonPath);
export const writeMedia = (mediaArray) => writeJSON(mediaJsonPath, mediaArray);
