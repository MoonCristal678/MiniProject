// Update the Mongoose schema for files
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
  }, 
  ); 
  
  
  const File = mongoose.model('File', fileSchema);
  
export default File;
