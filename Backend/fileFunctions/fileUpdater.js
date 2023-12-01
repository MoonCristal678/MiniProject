import File from '../fileSchema.js';

async function renderUpdateFileForm(req, res) {
  try {
    const files = await File.find({});
    res.render('updateFile.ejs', { files });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function updateFile(req, res) {
  const fileId = req.body.fileId;

  try {
    const file = await File.findById(fileId);

    if (file) {
      file.name = req.body.name;
      file.content = req.body.content;

      await file.save();
      res.json({ message: 'File updated successfully', file });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}

export { renderUpdateFileForm, updateFile };
