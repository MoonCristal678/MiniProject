File and User Operations API
Overview
This project consists of two versions of an Express.js-based API for file and user operations. Both versions provide endpoints for reading, writing, and deleting files, as well as managing user data. The primary difference between the two versions lies in their database handling approach.

Version 1
Version 1 of the API uses the MongoDB native driver for database interaction. It connects to a MongoDB database hosted on MongoDB Atlas using the MongoClient. This version demonstrates basic CRUD operations on users and files.

Features:
File Operations: Supports reading, writing, and deleting files.
User Operations: Allows adding users with minimal information (name and age), fetching all users, and rendering forms for user-related actions.
Technologies Used:
Express.js for handling HTTP requests.
MongoDB for data storage.
EJS for rendering views.
Usage:
Clone the repository.
Install dependencies using npm install.
Set up a MongoDB Atlas cluster and replace the uri variable in app.js with your MongoDB URI.
Run the application using npm start.
Access the API at http://localhost:3000/v1.
Version 2
Version 2 of the API employs Mongoose, an ODM (Object Data Modeling) library for MongoDB and Node.js. This version enhances user data by introducing a Mongoose schema, providing better structure and validation for user objects. It adds features for updating and deleting user records.

Features:
Extended User Information: Captures additional user details such as blood type, birthdate, and country of birth.
User Operations: Introduces user validation using Mongoose schema, allowing for more robust data handling.
Extended File Operations: Retains file operations from Version 1.
Technologies Used:
Express.js for handling HTTP requests.
MongoDB with Mongoose for data storage and modeling.
EJS for rendering views.
Usage:
Clone the repository.
Install dependencies using npm install.
Set up a MongoDB Atlas cluster and replace the connection string in mongoose.connect with your MongoDB URI.
Run the application using npm start/nodemon fileOperations.js.
Access the API at http://localhost:3000/v1.
API Endpoints
Common Endpoints
Read a File: /v1/read
Write to a File: /v1/write
Delete a File: /v1/delete
Version 1 Exclusive Endpoints
Display JSON Data: /v1/api/users
Add User: /v1/api/users
Form to Add a New User: /v1/add
Version 2 Exclusive Endpoints
Update User: /v1/updateUser
Delete User: /v1/deleteUser
Form to Update a User: /v1/updateUser
Form to Delete a User: /v1/deleteUser
Error Handling
Both versions include a generic error handler to catch and log any unexpected errors, returning a 500 status and a corresponding error message. Additionally, specific error handling is implemented for validation errors in Version 2, responding with a 400 status and an array of validation errors.

<<<<<<< HEAD
Workout, Nutrition Fact, and Goal Management API
Overview
This project is an Express.js API designed to manage workout information, nutrition facts, and fitness goals. It employs MongoDB as its database and Mongoose as an ODM (Object Data Modeling) library. The API supports CRUD (Create, Read, Update, Delete) operations for workouts, nutrition facts, and goals. Additionally, it incorporates EJS for rendering HTML templates.

Schemas
The API defines three schemas for data modeling:

Workout Schema
Fields:
name (String): The name of the workout.
duration (Number): Duration of the workout in minutes.
intensity (String): Intensity level of the workout.
Nutrition Fact Schema
Fields:
name (String): Name of the nutrition fact.
calories (Number): Number of calories.
protein (Number): Protein content.
carbs (Number): Carbohydrate content.
fat (Number): Fat content.
Goal Schema
Fields:
name (String): Name of the fitness goal.
target (Number): Target value associated with the goal (e.g., target weight).
API Endpoints
Workouts
Add Workout:

GET /addWorkout: Render the form to add a new workout.
POST /api/workouts: Add a new workout to the database.
View Workouts:

GET /api/workouts: Retrieve all workouts from the database.
Update Workout:

GET /updateWorkout: Render the form to update a workout.
POST /api/updateWorkout: Update an existing workout in the database.
Delete Workout:

GET /deleteWorkout: Render the form to delete a workout.
POST /api/deleteWorkout: Delete a workout from the database.
Nutrition Facts
Add Nutrition Fact:

GET /addNutritionFact: Render the form to add a new nutrition fact.
POST /api/nutrition-facts: Add a new nutrition fact to the database.
View Nutrition Facts:

GET /api/nutrition-facts: Retrieve all nutrition facts from the database.
Update Nutrition Fact:

GET /updateNutritionFact: Render the form to update a nutrition fact.
POST /api/updateNutritionFact: Update an existing nutrition fact in the database.
Delete Nutrition Fact:

GET /deleteNutritionFact: Render the form to delete a nutrition fact.
POST /api/deleteNutritionFact: Delete a nutrition fact from the database.
Goals
Add Goal:

GET /addGoal: Render the form to add a new fitness goal.
POST /api/goals: Add a new fitness goal to the database.
View Goals:

GET /api/goals: Retrieve all fitness goals from the database.
Update Goal:

GET /updateGoal: Render the form to update a fitness goal.
POST /api/updateGoal: Update an existing fitness goal in the database.
Delete Goal:

GET /deleteGoal: Render the form to delete a fitness goal.
POST /api/deleteGoal: Delete a fitness goal from the database.
Error Handling
The API includes error handling for potential issues such as validation errors, database connection errors, and internal server errors. Specific error messages and status codes are provided to aid in debugging.

Getting Started
Clone the repository.
Install dependencies using npm install.
Set up a MongoDB Atlas cluster and replace the connection strings in the code with your MongoDB URI.
Run the application using nodemon fileOperations.js as they are connected.
Access the API at http://localhost:3000/v1.
=======
Requires Node.js and a running MongoDB instance.
Connects to MongoDB to perform CRUD operations.
MongoDB Compass can be used to inspect and manipulate data stored in the connected MongoDB database.

To diploy on render.com. The build command prompt for both backend and front end is npm install. For the start you can use "node" your-file-name for backend and npm start for frontend. Make sure if diployed seperately that for each you input the necessary path. 
>>>>>>> 49e946b5984ea4ef652f5a9dc67350509868e966
