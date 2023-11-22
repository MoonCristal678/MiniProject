import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import v1Router from './schemas.js'
const app = express();
const port = 3000;
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
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  countryOfBirth: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model for users
const User = mongoose.model('User', userSchema);

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Render home page with links to file and user operations
app.get('/', (req, res) => {
  res.send(`<button ><a href="/v1/read"> Read a File </a> </button> 
              <button ><a href="/v1/write"> Write to a File </a> </button>
              <button ><a href="/v1/delete"> Delete a File </a> </button>
              <button ><a href="/v1/api/users"> Display JSON Data </a> </button>
              <button ><a href="/v1/add"> Add User </a> </button>
              <button ><a href="/v1/updateUser"> Update User </a> </button>
              <button ><a href="/v1/deleteUser"> Delete User </a> </button>
              <br>
              <h2> Workout Functions </h2>
              <button><a href="/v1/addWorkout"> Add Workout </a></button>
              <button><a href="/v1/addNutritionFact"> Add Nutrition Fact </a></button>
              <button><a href="/v1/addGoal"> Add Goal </a></button>
              <button><a href="/v1/api/workouts"> Display Workouts </a></button>
              <button><a href="/v1/api/nutrition-facts"> Display Nutrition Facts </a></button>
              <button><a href="/v1/api/goals"> Display Goals </a></button>
`);
});



// Render form to add a new user
v1Router.get('/add', (req, res) => {
  res.render('addUser.ejs');
});

// Add a new user with validation
// Modify the user creation route
v1Router.post(
  '/api/users',
  [
    body('name').notEmpty().trim().escape(),
    body('age').isInt({ min: 0 }),
    body('bloodType').notEmpty().trim().escape(),
    body('birthdate').isISO8601().toDate(),
    body('countryOfBirth').notEmpty().trim().escape(),
  ],
  async (req, res) => {
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
    });

    try {
      await newUser.save();
      res.json({ message: 'User added successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);


// Get all users
v1Router.get('/api/users', async (req, res) => {
  console.log('Backend responded');
  const users = await User.find({});
  res.json(users);
});

// Render form to read a file
v1Router.get('/read', async (req, res) => {
  const collection = mongoose.connection.db.collection('files');
  const files = await collection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
  const fileNames = files.map(file => file.name);
  res.render('readFile.ejs', { fileNames });
});

// Using async/await for read route
v1Router.post('/read', async (req, res) => {
  const fileName = req.body.fileName;

  const collection = mongoose.connection.db.collection('files'); // Access the 'files' collection directly

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
});

// Render form to write to a file
v1Router.get('/write', (req, res) => {
  res.render('writeFile.ejs');
});

// Using async/await for write route
v1Router.post('/write', async (req, res) => {
  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;

  const collection = mongoose.connection.db.collection('files');
  await collection.updateOne(
    { name: fileName },
    { $set: { content: fileContent } },
    { upsert: true }
  );

  res.send(`File '${fileName}' created with the provided content.`);
});

// Render form to delete a file
v1Router.get('/delete', async (req, res) => {
  const collection = mongoose.connection.db.collection('files');
  const files = await collection.find({}, { projection: { _id: 0, name: 1 } }).toArray();
  const fileNames = files.map(file => file.name);
  res.render('deleteFile.ejs', { fileNames });
});

// Using async/await for delete route
v1Router.post('/delete', async (req, res) => {
  const fileName = req.body.fileName;

  const collection = mongoose.connection.db.collection('files');
  const result = await collection.deleteOne({ name: fileName });

  if (result.deletedCount > 0) {
    res.send(`File '${fileName}' deleted.`);
  } else {
    res.status(404).send('File not found.');
  }
});

// Other routes remain the same...
v1Router.get('/updateUser', async (req, res) => {
  res.render('updateUser.ejs');
});

// Using async/await for update route
v1Router.post('/updateUser', async (req, res) => {
  const userId = req.body.userId; 
  try {
    const user = await User.findById(userId);

    if (user) {
      // Update the user fields as needed
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
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Render form to delete a user
v1Router.get('/deleteUser', (req, res) => {
  res.render('deleteUser.ejs');
});

// Using async/await for delete route
v1Router.post('/deleteUser', async (req, res) => {
  const userId = req.body.userId; 
  try {
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Use API versioning
app.use('/v1', v1Router);

// Define error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
