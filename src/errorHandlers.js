export const badRequestError = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({
      success: false,
      message: err.message,
      errorsList: err.errorsList,
    });
  } else {
    next(err);
  }
};

export const unauthorizedError = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ success: false, message: err.message });
  } else {
    next(err);
  }
};

export const notFoundError = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ success: false, message: err.message });
  } else {
    next(err);
  }
};

export const genericError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    success: false,
    message: "Internal Server Error ! Will be fixed soon check back in a bit !",
  });
};
