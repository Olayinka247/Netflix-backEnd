import express from "express";
import listEndpoints from "express-list-endpoints";
import mediaRouter from "./apis/media/index.js";
import {
  badRequestError,
  unauthorizedError,
  notFoundError,
  genericError,
} from "./errorHandlers.js";

const server = express();

const port = 3002;

server.use(express.json());

server.use("/media", mediaRouter);

server.use(badRequestError);
server.use(unauthorizedError);
server.use(notFoundError);
server.use(genericError);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`server is listening on port ${port} !`);
});

server.on("error", (erorr) => {
  console.log("CONTROLLED ERROR", erorr);
});
