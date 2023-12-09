import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import session from 'express-session';
import File from './fileSchema.js';
import { deleteFile} from './fileFunctions/fileDeleter.js';

import { userAuthRouter } from './userAuth.js'; 
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
 
}));
app.use(cors({
  origin: 'https://miniproject9-frontend.onrender.com',
  credentials: true,
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use('/auth', userAuthRouter);


const allowedOrigins = [
  'https://miniproject9-frontend.onrender.com',

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
  if (!req.isAuthenticated()) {
    // If not authenticated, render the login form
    const errorMessage = req.query.error; 
    res.render('login.ejs', { errorMessage });
  } else if(req.isAuthenticated()) {
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
    <button><a href="/auth/login"> Login </a></button>
    <form action="/auth/logout" method="post" style="display: inline;">
    <button type="submit"> Logout </button>
  </form>
  `);
  }
});

//Add and view users

v1Router.get('/add', renderAddUserForm);

v1Router.post('/api/users', validateUserInput, addUser);
v1Router.get('/api/users', getAllUsers);

// Update and Delete User
v1Router.get('/updateUser', renderUpdateUserForm);
v1Router.post('/updateUser', updateUser);
v1Router.get('/deleteUser', renderDeleteUserForm);
v1Router.post('/deleteUser', deleteUser);

//File Routes
//Read

v1Router.post('/read',   async (req, res) => {
  const fileName = req.body.fileName;

  try {
    const file = await File.findOne({ name: fileName });

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
   
    const userFiles = await File.find({});
    res.render(viewName, { fileNames: userFiles.map(file => file.name) });
  } catch (error) {
    handleServerError(res, error);
  }
};

v1Router.get('/delete',   async (req, res) => {
  await handleUserFilesRender(req, res, 'deleteFile.ejs');
});

v1Router.get('/read',   async (req, res) => {
  await handleUserFilesRender(req, res, 'readFile.ejs');
});
const handleUserFilesRenderWithFiles = async (req, res, viewName) => {
  try {
  
    const userFiles = await File.find({});
    res.render(viewName, { files: userFiles });
  } catch (error) {
    handleServerError(res, error);
  }
};

v1Router.get('/write',   async (req, res) => {
  await handleUserFilesRenderWithFiles(req, res, 'writeFile.ejs');
});

v1Router.get('/updateFile', async (req, res) => {
  await handleUserFilesRenderWithFiles(req, res, 'updateFile.ejs');
});


v1Router.post('/write',   validateFileInput, async (req, res) => {
  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;

  try {
    const existingFile = await File.findOne({ name: fileName });

    if (existingFile) {
      res.status(400).json({ message: 'File with the same name already exists for the user' });
    } else {
      const newFile = new File({ name: fileName, content: fileContent });
      await newFile.save();
      res.json({ message: 'File created successfully', file: newFile });
    }
  } catch (error) {
    handleServerError(res, error);
  }
});

//View Files
v1Router.get('/files',   async (req, res) => {
  try {
    const userFiles = await File.find({});
    res.json(userFiles);
  } catch (error) {
    handleServerError(res, error);
  }
});
//Delete Files


v1Router.post('/delete',   deleteFile);


v1Router.post('/updateFile',  async (req, res) => {
  const fileId = req.body.fileId;
  const newName = req.body.name;
  const newContent = req.body.content;

  try {
    const file = await File.findOne({ _id: fileId });

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
    const users = await User.find({});
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
  const newUser = new User({ name, age, bloodType, birthdate, countryOfBirth });

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
    // Fetch all users in the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    handleServerError(res, error);
  }
}



async function renderDeleteUserForm(req, res) {
  const users = await User.find({});
  res.render('deleteUser.ejs', { users });
}
async function deleteUser(req, res) {
  const userId = req.body.userId;

  try {
    const result = await User.deleteOne({ _id: userId});

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