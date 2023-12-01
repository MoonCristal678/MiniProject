// fileReader.js
import mongoose from 'mongoose';

async function renderReadFileForm(req, res) {
  const collection = mongoose.connection.db.collection('files');
  const files = await collection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
  const fileNames = files.map(file => file.name);
  res.render('readFile.ejs', { fileNames });
}

async function readFile(req, res) {
  const fileName = req.body.fileName;

  const collection = mongoose.connection.db.collection('files');

  try {
    const fileContent = await collection.findOne({ name: fileName });

    if (fileContent) {
      res.send(`<h2>File Content of '${fileName}':</h2><pre>${fileContent.content}</pre>`);
    } else {
      res.render('readFile.ejs', { readError: 'File not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Exporting the functions for use in other files
export { renderReadFileForm, readFile };
