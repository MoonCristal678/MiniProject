const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

const fs = require('fs').promises; // Use Promises version of fs
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Function to write content to a file using Promises
async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`File '${filePath}' successfully written.`);
  } catch (err) {
    console.error('Error writing to the file:', err.message);
    throw err;
  }
}

// Function to read and display the content of a file using Promises
async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    console.log(`File content of '${filePath}':`);
    console.log(content);
    return content;
  } catch (err) {
    console.error('Error reading the file:', err.message);
    throw err;
  }
}

// Function to delete a file using Promises
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File '${filePath}' successfully deleted.`);
  } catch (err) {
    console.error('Error deleting the file:', err.message);
    throw err;
  }
}

// Serve an HTML page with buttons to perform file operations
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>File Operations Page</title>
    </head>
    <body>
      <h1>Welcome to the File Operations Page</h1>
      <button onclick="redirectToReadFile()">Read a File</button>
      <button onclick="redirectToWriteFile()">Write to a File</button>
      <button onclick="redirectToDeleteFile()">Delete a File</button>
      <button onclick="redirectToApiUsers()">Display JSON Data</button>
      <button onclick="redirectToAddUser()">Add User</button>
      <script>
        function redirectToApiUsers() {
          window.location.href = '/v1/api/users';
        }
        function redirectToReadFile() {
          window.location.href = '/v1/read';
        }
        function redirectToWriteFile() {
          window.location.href = '/v1/write';
        }
        function redirectToDeleteFile() {
          window.location.href = '/v1/delete';
        }
        function redirectToAddUser() {
          window.location.href = '/v1/add';
        }
      
      </script>
    </body>
    </html>
  `);
});

// API Version 1
const v1Router = express.Router();

const jsonData = [
  { id: 1, name: 'John', age: 28},
  { id: 2, name: 'Jane', age: 55 }
];
// Route to get JSON data
v1Router.get('/api/users', async (req, res) => {
  try {
    // Simulate an asynchronous operation (e.g., reading from a database)
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json(jsonData);
  } catch (error) {
    console.error('Error getting JSON data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to render the "Add User" form
v1Router.get('/add', (req, res) => {
  res.render('addUser.ejs');
});

// Route to add a user to the JSON data
v1Router.post('/api/users', async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    res.status(400).json({ error: 'Both name and age are required' });
    return;
  }

  try {
    // Simulate an asynchronous operation (e.g., saving to a database)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = {
      id: jsonData.length + 1,
      name,
      age: parseInt(age), // Ensure age is a number
    };
    jsonData.push(newUser);

    // Send a success message along with the added user
    res.json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding a user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

v1Router.get('/read', (req, res) => {
  res.render('readFile.ejs');
});

// Using async/await for read route
v1Router.post('/read', async (req, res) => {
  const fileName = req.body.fileName;
  const filePath = path.join(__dirname, fileName);

  try {
    const fileContent = await readFile(filePath);
    res.render('readFile.ejs', { fileContent });
  } catch (err) {
    res.render('readFile.ejs', { readError: 'Error reading the file.' });
  }
});

v1Router.get('/write', (req, res) => {
  res.render('writeFile.ejs');
});

// Using async/await for write route
v1Router.post('/write', async (req, res) => {
  const fileName = req.body.fileName;
  const fileContent = req.body.fileContent;

  try {
    await writeFile(fileName, fileContent);
    res.send(`File '${fileName}' created with the provided content.`);
  } catch (err) {
    res.status(500).send('Error creating the file.');
  }
});

v1Router.get('/delete', (req, res) => {
  res.render('deleteFile.ejs');
});

// Using async/await for delete route
v1Router.post('/delete', async (req, res) => {
  const fileName = req.body.fileName;

  try {
    await deleteFile(fileName);
    res.send(`File '${fileName}' deleted.`);
  } catch (err) {
    res.status(500).send('Error deleting the file.');
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