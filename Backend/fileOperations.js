// fileOperations.js

import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import File from './fileSchema.js';
import { renderReadFileForm, readFile } from './fileFunctions/fileReader.js';
import { renderDeleteFileForm, deleteFile } from './fileFunctions/fileDeleter.js';
import { renderUpdateFileForm, updateFile } from './fileFunctions/fileUpdater.js';
const v1Router = express.Router();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://blackkrystal438:DemonSlayer1@fileanduserdata.3ynz8zm.mongodb.net/fileAndUserData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bloodType: { type: String, required: true },
  birthdate: { type: Date, required: true },
  countryOfBirth: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Home page route
app.get('/', (req, res) => {
  res.send(`
    <h1>File Functionality</h1>
    <button><a href="/v1/read"> Read a File </a></button>
    <button><a href="/v1/write"> Write to a File </a></button>
    <button><a href="/v1/delete"> Delete a File </a></button>
    <button><a href="/v1/updateFile"> Update a File </a></button>
    <button><a href="/v1/files"> View Files </a></button>
    <br>
    <h1>User Functionality</h1>
    <button><a href="/v1/api/users"> Display JSON Data </a></button>
    <button><a href="/v1/add"> Add User </a></button>
    <button><a href="/v1/updateUser"> Update User </a></button>
    <button><a href="/v1/deleteUser"> Delete User </a></button>
  `);
});

// User routes
v1Router.get('/add', renderAddUserForm);
v1Router.post('/api/users', validateUserInput, addUser);
v1Router.get('/api/users', getAllUsers);

// File routes
v1Router.get('/read', renderReadFileForm);
v1Router.post('/read', readFile);
v1Router.get('/write', renderWriteFileForm);
v1Router.post('/write', validateFileInput, writeFile);
v1Router.get('/files', viewFiles);
v1Router.get('/delete', renderDeleteFileForm);
v1Router.post('/delete', deleteFile);
v1Router.get('/updateUser', renderUpdateUserForm);
v1Router.post('/updateUser', updateUser);
v1Router.get('/deleteUser', renderDeleteUserForm);
v1Router.post('/deleteUser', deleteUser);
v1Router.get('/updateFile', renderUpdateFileForm);
v1Router.post('/updateFile', updateFile);

// API versioning
app.use('/v1', v1Router);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Helper functions

function renderAddUserForm(req, res) {
  res.render('addUser.ejs');
}

function validateUserInput(req, res, next) {
  const validationRules = [
    body('name').notEmpty().trim().escape(),
    body('age').isInt({ min: 0 }),
    body('bloodType').notEmpty().trim().escape(),
    body('birthdate').isISO8601().toDate(),
    body('countryOfBirth').notEmpty().trim().escape(),
  ];

  validationResult(req);
  next();
}

async function addUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, age, bloodType, birthdate, countryOfBirth } = req.body;
  const newUser = new User({ name, age, bloodType, birthdate, countryOfBirth });

  try {
    await newUser.save();
    res.json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    handleServerError(res, error);
  }
}


async function renderWriteFileForm(req, res) {
  try {
    const files = await File.find({});
    res.render('writeFile.ejs', { files });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

function validateFileInput(req, res, next) {
  const validationRules = [
    body('fileName').notEmpty().trim().escape(),
    body('fileContent').notEmpty().trim().escape(),
  ];

  validationResult(req);
  next();
}

async function writeFile(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fileName, fileContent } = req.body;
  const newFile = new File({ name: fileName, content: fileContent });

  try {
    await newFile.save();
    res.json({ message: 'File created successfully', file: newFile });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function viewFiles(req, res) {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (error) {
    handleServerError(res, error);
  }
}

async function renderUpdateUserForm(req, res) {
  try {
    const users = await User.find({});
    res.render('updateUser.ejs', { users });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function updateUser(req, res) {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);

    if (user) {
      user.name = req.body.name;
      user.age = req.body.age;
      user.bloodType = req.body.bloodType;
      user.birthdate = req.body.birthdate;
      user.countryOfBirth = req.body.countryOfBirth;

      await user.save();
      res.json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}

async function renderDeleteUserForm(req, res) {
  try {
    const users = await User.find({});
    res.render('deleteUser.ejs', { users });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function deleteUser(req, res) {
  const userId = req.body.userId;

  try {
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}



function handleServerError(res, error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
