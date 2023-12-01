import File from '../fileSchema.js';

async function renderDeleteFileForm(req, res) {
    try {
      const files = await File.find({});
      const fileNames = files.map((file) => file.name);
      res.render('deleteFile.ejs', { fileNames });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  

async function deleteFile(req, res) {
  const { fileName } = req.body;
  console.log('Deleting file on the server:', fileName);

  try {
    const result = await File.deleteOne({ name: fileName });

    if (result.deletedCount > 0) {
      res.json({ message: `File '${fileName}' deleted successfully` });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}

// Exporting the functions for use in other files
export { renderDeleteFileForm, deleteFile };
