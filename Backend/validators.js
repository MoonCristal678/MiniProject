import { body, validationResult } from 'express-validator';

export function validateUserInput(req, res, next) {
  const validationRules = [
    body('name').notEmpty().trim().escape(),
    body('age').isInt({ min: 0 }),
    body('bloodType').notEmpty().trim().escape(),
    body('birthdate').isISO8601().toDate(),
    body('countryOfBirth').notEmpty().trim().escape(),
  ];

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

export function validateFileInput(req, res, next) {
  const validationRules = [
    body('fileName').notEmpty().trim().escape(),
    body('fileContent').notEmpty().trim().escape(),
  ];

  validationResult(req);
  next();
}
