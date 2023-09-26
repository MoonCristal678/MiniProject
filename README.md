# MiniProject
This is a Node.js application that demonstrates how to perform file operations such as reading, writing, and deleting files using the built-in `fs` module. The application also includes an API that returns JSON data.

The application uses the `express` module to create a server and handle HTTP requests. The `fs` module is used to perform file operations such as reading, writing, and deleting files. The `path` module is used to construct file paths.

The application has three functions to perform file operations:
- `writeFile(filePath, content)`: writes the `content` to a file at the specified `filePath`.
- `readFile(filePath)`: reads the content of a file at the specified `filePath` and returns it.
- `deleteFile(filePath)`: deletes the file at the specified `filePath`.

The application also has an API that returns JSON data. The API is versioned using the `express.Router()` method. The API has two endpoints:
- `/v1/api/users`: returns a JSON array of user objects.
- `/v1/read`: renders an HTML page with a form to read the content of a file.
- `/v1/write`: renders an HTML page with a form to write content to a file.
- `/v1/delete`: renders an HTML page with a form to delete a file.

The HTML pages use the `ejs` template engine to render dynamic content. The HTML pages have buttons that call JavaScript functions to redirect to the appropriate API endpoint.

The application also has an error handler that logs errors to the console and returns a 500 status code to the client.

To run the application, you need to have Node.js installed on your system. You can start the server by running the command `node app.js` in the terminal. The server will listen on port 3000 by default. You can access the application by visiting `http://localhost:3000` in your web browser.

