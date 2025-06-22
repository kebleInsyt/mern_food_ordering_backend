import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult,  ValidationChain } from "express-validator";

const handleValidationErrors: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

const validateMyUserRequestRules:  ValidationChain[] = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string")
];

const validateMyRestaurantRequestRules = {
    
}

export const validateMyUserRequest: RequestHandler[] = [
    ...validateMyUserRequestRules,
    handleValidationErrors,
]