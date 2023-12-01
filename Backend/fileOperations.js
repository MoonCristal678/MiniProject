// fileOperations.js

import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import File from './fileSchema.js';
import { renderReadFileForm, readFile } from './fileFunctions/fileReader.js';
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
v1Router.get('/add', (req, res) => renderUserForm(res, 'addUser.ejs'));
v1Router.get('/updateUser', (req, res) => renderUserForm(res, 'updateUser.ejs'));
v1Router.get('/deleteUser', (req, res) => renderUserForm(res, 'deleteUser.ejs'));
v1Router.post('/api/users', handleValidationResult, validateUserInput, addUser);
v1Router.get('/api/users', getAllUsers);

// File routes
v1Router.get('/read', renderReadFileForm);
v1Router.post('/read', readFile);
v1Router.get('/write', (req, res) => renderFileForm(res, 'writeFile.ejs'));
v1Router.post('/write', handleValidationResult, validateFileInput, (req, res) => createFileAndRespond(req, res, createFile));
v1Router.get('/files', (req, res) => createFileAndRespond(req, res, viewFiles));
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

async function renderUserForm(res, view) {
  try {
    const users = await User.find({});
    res.render(view, { users });
  } catch (error) {
    handleServerError(res, error);
  }
}

function handleValidationResult(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

async function createFileAndRespond(req, res, creationFunction) {
  try {
    const result = await creationFunction(req.body);
    res.json(result);
  } catch (error) {
    handleServerError(res, error);
  }
}

async function renderFileForm(res, view) {
  try {
    const files = await File.find({});
    res.render(view, { files });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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

function validateFileInput(req, res, next) {
  const validationRules = [
    body('fileName').notEmpty().trim().escape(),
    body('fileContent').notEmpty().trim().escape(),
  ];

  validationResult(req);
  next();
}

async function viewFiles(req, res) {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (error) {
    handleServerError(res, error);
  }
}

function handleServerError(res, error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
