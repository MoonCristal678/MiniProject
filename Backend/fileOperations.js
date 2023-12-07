import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import session from 'express-session';
import File from './fileSchema.js';
import { deleteFile} from './fileFunctions/fileDeleter.js';

import { userAuthRouter } from './userAuth.js'; // Adjust the path
import { passport } from './passport.js';
import { validateUserInput, validateFileInput } from './validators.js';
const v1Router = express.Router();
const app = express();
const port = 3000;

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000,
    
   
  },
  credentials: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/auth', userAuthRouter);



app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});



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
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
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
    <form action="/auth/logout" method="post" style="display: inline;">
    <button type="submit"> Logout </button>
  </form>
  `);
});
function ensureAuthenticated(req, res, next) {
  if (!req.user) {
    // Redirect to the login page
    return res.redirect('/auth/login');
  }
  next(); // Continue to the next handler
}
// User routes
//Add and view users
v1Router.get('/add', ensureAuthenticated, renderAddUserForm);
v1Router.post('/api/users', ensureAuthenticated, validateUserInput, addUser);
v1Router.get('/api/users', ensureAuthenticated, getAllUsers);

// Update and Delete User
v1Router.get('/updateUser', ensureAuthenticated, renderUpdateUserForm);
v1Router.post('/updateUser', ensureAuthenticated, updateUser);
v1Router.get('/deleteUser', ensureAuthenticated, renderDeleteUserForm);
v1Router.post('/deleteUser', ensureAuthenticated, deleteUser);

//File Routes
//Read

v1Router.post('/read',  ensureAuthenticated, async (req, res) => {
  const fileName = req.body.fileName;

  try {
    const file = await File.findOne({ name: fileName, createdBy: req.user._id });

    if (file) {
      res.render('readFileContent.ejs', { fileName: file.name, fileContent: file.content });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
});

const handleUserFilesRender = async (req, res, viewName) => {
  try {
    // Only retrieve files created by the authenticated user
    const userFiles = await File.find({ createdBy: req.user._id });
    res.render(viewName, { fileNames: userFiles.map(file => file.name) });
  } catch (error) {
    handleServerError(res, error);
  }
};

v1Router.get('/delete',  ensureAuthenticated, async (req, res) => {
  await handleUserFilesRender(req, res, 'deleteFile.ejs');
});

v1Router.get('/read',  ensureAuthenticated, async (req, res) => {
  await handleUserFilesRender(req, res, 'readFile.ejs');
});
const handleUserFilesRenderWithFiles = async (req, res, viewName) => {
  try {
    // Only retrieve files created by the authenticated user
    const userFiles = await File.find({ createdBy: req.user._id });
    res.render(viewName, { files: userFiles });
  } catch (error) {
    handleServerError(res, error);
  }
};

v1Router.get('/write',  ensureAuthenticated, async (req, res) => {
  await handleUserFilesRenderWithFiles(req, res, 'writeFile.ejs');
});

v1Router.get('/updateFile', async (req, res) => {
  await handleUserFilesRenderWithFiles(req, res, 'updateFile.ejs');
});


v1Router.post('/write',  ensureAuthenticated, validateFileInput, async (req, res) => {
  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;

  try {
    const existingFile = await File.findOne({ name: fileName, createdBy: req.user._id });

    if (existingFile) {
      res.status(400).json({ message: 'File with the same name already exists for the user' });
    } else {
      const newFile = new File({ name: fileName, content: fileContent, createdBy: req.user._id });
      await newFile.save();
      res.json({ message: 'File created successfully', file: newFile });
    }
  } catch (error) {
    handleServerError(res, error);
  }
});

//View Files
v1Router.get('/files',  ensureAuthenticated, async (req, res) => {
  try {
    const userFiles = await File.find({ createdBy: req.user._id });
    res.json(userFiles);
  } catch (error) {
    handleServerError(res, error);
  }
});
//Delete Files


v1Router.post('/delete',  ensureAuthenticated, deleteFile);


v1Router.post('/updateFile',  ensureAuthenticated, async (req, res) => {
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
});

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
//Render user Form
function renderAddUserForm(req, res) {
  res.render('addUser.ejs');
}


//Render update user
async function renderUpdateUserForm(req, res) {
  try {
    const users = await User.find({ createdBy: req.user._id });
    res.render('updateUser.ejs', { users });
  } catch (error) {
    handleServerError(res, error);
  }
}

async function addUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, age, bloodType, birthdate, countryOfBirth } = req.body;
  const newUser = new User({
    name,
    age,
    bloodType,
    birthdate,
    countryOfBirth,
    createdBy: req.user._id, // Set the createdBy field to the authenticated user's ID
  });

  try {
    await newUser.save();
    res.json({ message: 'User added successfully', user: newUser });
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

// Updated getAllUsers function
async function getAllUsers(req, res) {
  try {
    const users = await User.find({ createdBy: req.user._id });
    res.json(users);
  } catch (error) {
    handleServerError(res, error);
  }
}


async function renderDeleteUserForm(req, res) {
  const users = await User.find({ createdBy: req.user._id });
  res.render('deleteUser.ejs', { users });
}
async function deleteUser(req, res) {
  const userId = req.body.userId;

  try {
    const result = await User.deleteOne({ _id: userId, createdBy: req.user._id });

    if (result.deletedCount > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found or unauthorized' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
}

function handleServerError(res, error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}