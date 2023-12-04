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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAuth', // Assuming 'UserAuth' is your user schema/model name
    required: true,
  },
});

const File = mongoose.model('File', fileSchema);

export default File;
