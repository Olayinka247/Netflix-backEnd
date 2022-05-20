import { checkSchema } from "express-validator";

const newReviewSchema = {
  comment: {
    isString: {
      errorMessage: "Comment is a cumpolsory Field",
    },
  },
  rate: {
    isInt: {
      options: {
        min: 1,
        max: 5,
      },
      errorMessage: "Rate only number between 1 and 5 are allowed",
    },
  },
};

export const checkNewReviewSchema = checkSchema(newReviewSchema);
