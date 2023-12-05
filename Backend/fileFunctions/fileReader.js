// readFileRoutes.js

import File from '../fileSchema.js';
import { handleServerError } from '../commonFunctions.js'; // Assuming you have a common functions file

async function renderReadFileForm(req, res) {
  try {
    const userFiles = await File.find({ createdBy: req.user._id });
    res.render('readFile.ejs', { fileNames: userFiles.map(file => file.name) });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function readFile(req, res) {
  const fileName = req.body.fileName;

  try {
    const file = await File.findOne({ name: fileName, createdBy: req.user._id });

    if (file) {
      res.render('readFileContent.ejs', { fileName: file.name, fileContent: file.content });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}

export { renderReadFileForm, readFile };
