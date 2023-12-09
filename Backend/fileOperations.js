import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import session from 'express-session';
import File from './fileSchema.js';
import { deleteFile} from './fileFunctions/fileDeleter.js';
import { UserAuth } from './userAuth.js'; // Update the path accordingly
import Cookies from 'js-cookie';

import { userAuthRouter } from './userAuth.js'; // Adjust the path
import { passport } from './passport.js';
import { validateUserInput, validateFileInput } from './validators.js';
const v1Router = express.Router();
const app = express();
const port = 3000;
app.use('/auth', userAuthRouter);
const allowedOrigins = [
  'https://miniproject9-frontend.onrender.com',
  // Add other allowed origins if needed
];

app.all('*', function(req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({
  origin: 'https://miniproject9-frontend.onrender.com',
  credentials: true,
}));

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000,
   
    
  },
 
}));

app.use(passport.initialize());
app.use(passport.session());

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
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  
});

const User = mongoose.model('User', userSchema);
app.get('/',  async (req, res) => {
  res.redirect('/auth/login');
});
// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});



v1Router.get('/add',  renderAddUserForm);

v1Router.post('/api/users', validateUserInput, addUser);
v1Router.get('/api/users', getAllUsers);


// Update and Delete User
v1Router.get('/updateUser', renderUpdateUserForm);
v1Router.post('/updateUser',  updateUser);
v1Router.get('/deleteUser', renderDeleteUserForm);
v1Router.post('/deleteUser', deleteUser);

//File Routes
//Read

v1Router.post('/read',  async (req, res) => {
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

v1Router.get('/delete',  async (req, res) => {
  await handleUserFilesRender(req, res, 'deleteFile.ejs');
});

v1Router.get('/read', async (req, res) => {
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

v1Router.get('/write', async (req, res) => {
  await handleUserFilesRenderWithFiles(req, res, 'writeFile.ejs');
});

v1Router.get('/updateFile', async (req, res) => {
  await handleUserFilesRenderWithFiles(req, res, 'updateFile.ejs');
});


v1Router.post('/write', validateFileInput, async (req, res) => {
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
// View Files
v1Router.get('/files', async (req, res) => {
  try {
    const userFiles = await File.find({ createdBy: req.user._id });
    res.json(userFiles);
  } catch (error) {
    handleServerError(res, error);
  }
});

//Delete Files


v1Router.post('/delete', deleteFile);


v1Router.post('/updateFile',  async (req, res) => {
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


async function getAllUsers(req, res) {
  try {
   
    // Retrieve the user ID from the cookie or any other storage mechanism
    const currentUserId = req.cookies.myUserIdCookie; // Adjust this based on how you store user information

    if (!currentUserId) {
      // If the user is not identified, send a 401 Unauthorized response
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch users based on the createdBy field (users created by the identified user)
    const users = await User.find({ createdBy: currentUserId });
    res.json(users);
  } catch (error) {
    // If an error occurs, handle it and send a 500 Internal Server Error response
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