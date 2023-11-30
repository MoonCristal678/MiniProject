CODE CLIMATE RATING: B
RUNS ON RENDER.COM AS WELL

Technologies Used
Express.js: A web application framework for Node.js.
MongoDB: A NoSQL database used for storing file and user data.
EJS: A simple templating engine for rendering HTML templates.
Setup
Prerequisites
Node.js installed on your machine.
MongoDB set up and running.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/file-operations-server.git
Install dependencies:

bash
Copy code
cd file-operations-server
npm install
Create a .env file in the project root and add your MongoDB connection URI:

bash
Copy code
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
Running the Server
Start the server:

bash
Copy code
npm start
The server will run on http://localhost:3001.

Endpoints
Home
URL: /
Description: Renders a home page with links to various file and user operations.
Add User
URL: /v1/add
Method: GET
Description: Renders a form to add a new user.
Add User (API)
URL: /v1/api/users
Method: POST
Description: Adds a new user to the JSON data.
Request Body:
json
Copy code
{
  "name": "John Doe",
  "age": 30
}
Response: JSON data of the added user.
Display JSON Data
URL: /v1/api/users
Method: GET
Description: Fetches and displays JSON data.
Read File
URL: /v1/read
Method: GET
Description: Renders a form to read the content of a file.
Read File (API)
URL: /v1/read
Method: POST
Description: Reads the content of the specified file.
Request Body:
json
Copy code
{
  "fileName": "example.txt"
}
Response: HTML page displaying the file content or an error message.
Write File
URL: /v1/write
Method: GET
Description: Renders a form to write content to a file.
Write File (API)
URL: /v1/write
Method: POST
Description: Writes content to the specified file.
Request Body:
json
Copy code
{
  "fileName": "example.txt",
  "fileContent": "Lorem ipsum dolor sit amet."
}
Response: Success message or an error message.
Delete File
URL: /v1/delete
Method: GET
Description: Renders a form to delete a file.
Delete File (API)
URL: /v1/delete
Method: POST
Description: Deletes the specified file.
Request Body:
json
Copy code
{
  "fileName": "example.txt"
}
Response: Success message or an error message.
Display Files
URL: /v1/files
Method: GET
Description: Fetches and displays information about all files.

1. Data Storage: MongoDB vs File System
Current Version: MongoDB
The current version utilizes MongoDB, a NoSQL database, to store both user data and file content.
MongoDB offers flexibility in handling unstructured data, allowing easy scalability as the application evolves.
Previous Version: File System (Promises version of fs)
The previous version used the file system to store user data and file content.
Each file and user operation interacted directly with the file system through the Promises version of fs.
2. User Data Management: MongoDB Collections vs JSON Array
Current Version: MongoDB Collections
User data is stored in a MongoDB collection named 'users'.
The server can perform CRUD operations on user data directly through MongoDB queries.
Previous Version: JSON Array
In the previous version, user data was stored in a JavaScript array (jsonData).
CRUD operations were performed by manipulating the JavaScript array directly.
3. File Content Storage: MongoDB Collection vs Individual Files
Current Version: MongoDB Collection
File content is stored in a MongoDB collection named 'files'.
Each document in the collection represents a file, containing properties like name and content.
Previous Version: Individual Files
In the previous version, file content was stored in individual files on the file system.
Each file operation directly interacted with the file system to read, write, or delete files.
4. Rendering HTML Templates: EJS vs Inline HTML Strings
Current Version: EJS (Embedded JavaScript)
HTML templates are rendered using EJS, a templating engine that allows embedding JavaScript code in HTML.
This provides a clean separation between HTML structure and dynamic content.
Previous Version: Inline HTML Strings
In the previous version, HTML pages were generated using inline HTML strings within JavaScript.
This approach can become less maintainable as the complexity of the HTML content increases.
5. Routing and API Versioning: Express Router
Current Version: Express Router
API routes are organized using an Express Router (v1Router).
This promotes a modular and organized structure for handling different versions of API routes.
Previous Version: Direct Route Handling
Routes and API versions were handled directly within the main application file.
6. Error Handling: Middleware vs Inline
Current Version: Express Middleware
Error handling is implemented using Express middleware.
This provides a centralized location to handle errors and send appropriate responses.
Previous Version: Inline Error Handling
Error handling was implemented inline within the route functions.
7. Additional Features: Display Files
Current Version
The current version introduces the ability to display information about all files.
The /v1/files endpoint fetches and displays data from the 'files' collection.
8. Async/Await vs Promises for File Operations
Current Version: Async/Await
The current version consistently utilizes async/await for handling asynchronous operations.
This enhances readability and simplifies error handling compared to chaining promises.
Previous Version: Promises
The previous version used the Promises version of fs, which also handled asynchronous file operations but with a different syntax.
Conclusion
The current version of the server embraces a more sophisticated and scalable architecture by integrating MongoDB for data storage and Express Router for organized routing. These changes enhance maintainability, scalability, and the overall structure of the server compared to its previous version, which relied on file operations with the Promises version of fs.