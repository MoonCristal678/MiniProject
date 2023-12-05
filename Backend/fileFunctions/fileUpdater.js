// updateFileRoutes.js

import File from '../fileSchema.js';
import { handleServerError } from '../commonFunctions.js'; // Assuming you have a common functions file

async function renderUpdateFileForm(req, res) {
  try {
    const userFiles = await File.find({ createdBy: req.user._id });
    res.render('updateFile.ejs', { files: userFiles });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function updateFile(req, res) {
  const fileId = req.body.fileId;
  const newName = req.body.name;
  const newContent = req.body.content;

  try {
    const file = await File.findOne({ _id: fileId, createdBy: req.user._id });

    if (file) {
      file.name = newName;
      file.content = newContent;

      await file.save();
      res.json({ message: 'File updated successfully', file });
    } else {
      res.status(404).json({ message: 'File not found or unauthorized' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}

export { renderUpdateFileForm, updateFile };
