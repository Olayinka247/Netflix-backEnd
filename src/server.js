import express from "express";
import listEndpoints from "express-list-endpoints";
import mediaRouter from "./apis/media/media.js";

const server = express();

const port = 3001;

server.use("/media", mediaRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`server is listening on port ${port} !`);
});

server.on("error", (erorr) => {
  console.log("CONTROLLED ERROR", erorr);
});
