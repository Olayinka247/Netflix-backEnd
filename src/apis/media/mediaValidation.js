import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const mediasSchema = {
  Title: {
    isString: {
      errorMessage: "Title is a compulsory Field",
    },
  },
  Year: {
    isString: {
      errorMessage: "Year is a compulsory Field",
    },
  },
  Type: {
    isString: {
      errorMessage: "Type is a compulsory Field",
    },
  },
  Poster: {
    isURL: {
      errorMessage: "Type is a compulsory Field",
    },
  },
};

const mediasUpdateSchema = {
  Title: {
    isString: {
      errorMessage: "Title is a compulsory Field",
    },
    optional: true,
  },
  Year: {
    isString: {
      errorMessage: "Year is a compulsory Field",
    },
    optional: true,
  },
  Type: {
    isString: {
      errorMessage: "Type is a compulsory Field",
    },
    optional: true,
  },
  Poster: {
    isURL: {
      errorMessage: "Type is a compulsory Field",
    },
  },
};

export const checksMediasSchema = checkSchema(mediasSchema);

export const checksUpdateMediasSchema = checkSchema(mediasUpdateSchema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(
      createError(400, `Validation errors!`, { errorsList: errors.array() })
    );
  } else {
    next();
  }
};
