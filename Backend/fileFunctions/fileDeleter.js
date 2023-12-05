import File from '../fileSchema.js';

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
export {deleteFile };