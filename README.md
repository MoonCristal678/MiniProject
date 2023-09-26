# MiniProject
This is a Node.js program that demonstrates how to perform file operations such as reading, writing, and deleting files. It also creates an HTTP server that serves an HTML page with a button that redirects to a JSON data page.

The program starts by defining three functions: `writeFile()`, `readFile()`, and `deleteFile()`. These functions use the `fs` module to perform file operations such as writing content to a file, reading and displaying the content of a file, and deleting a file.

The program then creates an HTTP server using the `http` module. The server listens for incoming requests and responds with either an HTML page or JSON data depending on the request URL. If the request URL is `/`, the server serves an HTML page with a button that redirects to `/api/users`. If the request URL is `/api/users`, the server reads and displays the content of a JSON file named `users.json` and responds with JSON data.

Finally, the program defines a function named `performFileOperations()` that takes user input for file operations such as reading, writing, and deleting files. This function uses the `readline` module to prompt the user for input and calls the appropriate file operation function based on the user's choice.

To run the program, you can call the `performFileOperations()` function. This will prompt the user for input and perform the selected file operation.
