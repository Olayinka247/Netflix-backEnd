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

const port = process.env.PORT || 3002;

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const corsOptions = {
  origin: (origin, next) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(
        createError(
          400,
          `Cors Error! your origin ${origin} is not in the list!`
        )
      );
    }
  },
};

server.use(cors(corsOptions));
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
