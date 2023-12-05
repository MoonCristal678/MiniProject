// writeFileRoutes.js

import File from '../fileSchema.js';
import { handleServerError } from '../commonFunctions.js'; // Assuming you have a common functions file

async function renderWriteFileForm(req, res) {
  try {
    const userFiles = await File.find({ createdBy: req.user._id });
    res.render('writeFile.ejs', { files: userFiles });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function writeFile(req, res) {
  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;

  try {
    const existingFile = await File.findOne({ name: fileName, createdBy: req.user._id });

    if (existingFile) {
      res.status(400).json({ message: 'File with the same name already exists for the user' });
    } else {
      const newFile = new File({ name: fileName, content: fileContent, createdBy: req.user._id });
      await newFile.save();
      res.json({ message: 'File created successfully', file: newFile });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}

export { renderWriteFileForm, writeFile };
