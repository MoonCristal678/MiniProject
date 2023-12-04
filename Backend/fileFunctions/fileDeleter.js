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
  
    try {
      const result = await File.deleteOne({ name: fileName, createdBy: req.user._id });
  
      if (result.deletedCount > 0) {
        res.json({ message: `File '${fileName}' deleted successfully` });
      } else {
        res.status(404).json({ message: 'File not found or unauthorized' });
      }
    } catch (error) {
      handleServerError(res, error);
    }
  }
export { renderDeleteFileForm, deleteFile };