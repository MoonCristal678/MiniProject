// fileWriter.js
import File from '../fileSchema.js';
import { validationResult, body } from 'express-validator';

// Validation rules for the file input
const validationRules = [
  body('fileName').notEmpty().trim().escape(),
  body('fileContent').notEmpty().trim().escape(),
  // ... (Add more rules as needed)
];

async function renderWriteFileForm(req, res) {
  try {
    const files = await File.find({});
    res.render('writeFile.ejs', { files });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

function validateFileInput(req, res, next) {
    // Define validation rules using express-validator's `body` function
    const validationRules = [
      body('fileName').notEmpty().withMessage('File name cannot be empty').trim().escape(),
      body('fileContent').notEmpty().withMessage('File content cannot be empty').trim().escape(),
    ];
  
    // Apply validation rules to the request
    validationRules.forEach(validationRule => validationRule(req));
  
    // Get validation errors from the request
    const errors = validationResult(req);
  
    // Check if there are validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    
  }

async function writeFile(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fileName, fileContent } = req.body;
  const newFile = new File({ name: fileName, content: fileContent });

  try {
    await newFile.save();
    res.json({ message: 'File created successfully', file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function viewFiles(req, res) {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Exporting the functions for use in other files
export { renderWriteFileForm, validateFileInput, writeFile, viewFiles };
