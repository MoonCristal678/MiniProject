
import express from 'express';
import mongoose from 'mongoose';


const v1Router = express.Router();

// Schemas
const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  intensity: {
    type: String,
    required: true,
  },
});

const nutritionFactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
});

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
});

const Workout = mongoose.model('Workout', workoutSchema);
const NutritionFact = mongoose.model('NutritionFact', nutritionFactSchema);
const Goal = mongoose.model('Goal', goalSchema);

// Workouts CRUD operations
//Add Workout
v1Router.get('/addWorkout', (req, res) => {
  res.render('addWorkout.ejs');
});
//View Workouts
v1Router.post('/api/workouts', async (req, res) => {
  const { name, duration, intensity } = req.body;

  try {
    // Ensure the collection exists
    const workoutCollection = mongoose.connection.db.collection('workouts');
    if (!(await workoutCollection.indexExists('name_1'))) {
      await workoutCollection.createIndex({ name: 1 }, { unique: true });
    }

    const newWorkout = new Workout({
      name,
      duration,
      intensity,
    });

    await newWorkout.save();
    res.json({ message: 'Workout added successfully', workout: newWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

v1Router.get('/api/workouts', async (req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
});

//Update Workouts
v1Router.get('/updateWorkout', async (req, res) => {
    try {
      const workouts = await Workout.find({}, '_id name');
      res.render('updateWorkout.ejs', { workouts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  v1Router.post('/api/updateWorkout', async (req, res) => {
    const workoutId = req.body.workoutId;
  
    try {
      const workout = await Workout.findById(workoutId);
  
      if (workout) {
        // Update the workout fields as needed
        workout.name = req.body.name;
        workout.duration = req.body.duration;
        workout.intensity = req.body.intensity;
  
        await workout.save();
        res.json({ message: 'Workout updated successfully', workout });
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // In your server-side code
v1Router.get('/deleteWorkout', async (req, res) => {
    try {
      const workouts = await Workout.find({}, '_id name');
      res.render('deleteWorkout.ejs', { workouts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  v1Router.post('/api/deleteWorkout', async (req, res) => {
    const workoutId = req.body.workoutId;
  
    try {
      const result = await Workout.deleteOne({ _id: workoutId });
  
      if (result.deletedCount > 0) {
        res.json({ message: 'Workout deleted successfully' });
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  

// Nutrition Facts CRUD operations
v1Router.get('/addNutritionFact', (req, res) => {
  res.render('addNFact.ejs');
});

v1Router.post('/api/nutrition-facts', async (req, res) => {
  const { name, calories, protein, carbs, fat } = req.body;

  try {
    // Ensure the collection exists
    const nutritionFactCollection = mongoose.connection.db.collection('nutritionfacts');
    if (!(await nutritionFactCollection.indexExists('name_1'))) {
      await nutritionFactCollection.createIndex({ name: 1 }, { unique: true });
    }

    const newNutritionFact = new NutritionFact({
      name,
      calories,
      protein,
      carbs,
      fat,
    });

    await newNutritionFact.save();
    res.json({ message: 'Nutrition Fact added successfully', nutritionFact: newNutritionFact });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

v1Router.get('/api/nutrition-facts', async (req, res) => {
  const nutritionFacts = await NutritionFact.find({});
  res.json(nutritionFacts);
});

// In your server-side code
v1Router.get('/updateNutritionFact', async (req, res) => {
    try {
      const nutritionFacts = await NutritionFact.find({}, '_id name');
      res.render('updateNutritionFact.ejs', { nutritionFacts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  v1Router.post('/api/updateNutritionFact', async (req, res) => {
    const nutritionFactId = req.body.nutritionFactId; 
    try {
      const nutritionFact = await NutritionFact.findById(nutritionFactId);
  
      if (nutritionFact) {
        // Update the nutritionFact fields as needed
        nutritionFact.name = req.body.name;
        nutritionFact.calories = req.body.calories;
        nutritionFact.protein = req.body.protein;
        nutritionFact.carbs = req.body.carbs;
        nutritionFact.fat = req.body.fat;
  
        await nutritionFact.save();
        res.json({ message: 'Nutrition Fact updated successfully', nutritionFact });
      } else {
        res.status(404).json({ message: 'Nutrition Fact not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  v1Router.get('/deleteNutritionFact', async (req, res) => {
    try {
      const nutritionFacts = await NutritionFact.find({}, '_id name');
      res.render('deleteNutritionFact.ejs', { nutritionFacts });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  v1Router.post('/api/deleteNutritionFact', async (req, res) => {
    const nutritionFactId = req.body.nutritionFactId;
  
    try {
      const result = await NutritionFact.deleteOne({ _id: nutritionFactId });
  
      if (result.deletedCount > 0) {
        res.json({ message: 'Nutrition Fact deleted successfully' });
      } else {
        res.status(404).json({ message: 'Nutrition Fact not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  // In your server-side code

  
 

// Goals CRUD operations
v1Router.get('/addGoal', (req, res) => {
  res.render('addGoal.ejs');
});

v1Router.post('/api/goals', async (req, res) => {
  const { name, target } = req.body;

  try {
    // Ensure the collection exists
    const goalCollection = mongoose.connection.db.collection('goals');
    if (!(await goalCollection.indexExists('name_1'))) {
      await goalCollection.createIndex({ name: 1 }, { unique: true });
    }

    const newGoal = new Goal({
      name,
      target,
    });

    await newGoal.save();
    res.json({ message: 'Goal added successfully', goal: newGoal });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

v1Router.get('/api/goals', async (req, res) => {
  const goals = await Goal.find({});
  res.json(goals);
});
  
 // In your server-side code
v1Router.get('/deleteGoal', async (req, res) => {
    try {
      const goals = await Goal.find({}, '_id name');
      res.render('deleteGoal.ejs', { goals });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  v1Router.post('/api/deleteGoal', async (req, res) => {
    const goalId = req.body.goalId;
  
    try {
      const result = await Goal.deleteOne({ _id: goalId });
  
      if (result.deletedCount > 0) {
        res.json({ message: 'Goal deleted successfully' });
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // In your server-side code
v1Router.get('/updateGoal', async (req, res) => {
    try {
      const goals = await Goal.find({}, '_id name');
      res.render('updateGoal.ejs', { goals });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  v1Router.post('/api/updateGoal', async (req, res) => {
    const goalId = req.body.goalId; // Assuming you have a field for entering the goal ID in your updateGoal.ejs form
  
    // Fetch the goal by ID and update its information
    try {
      const goal = await Goal.findById(goalId);
  
      if (goal) {
        // Update the goal fields as needed
        goal.name = req.body.name;
        goal.target = req.body.target;
        // Add other fields as needed
  
        await goal.save();
        res.json({ message: 'Goal updated successfully', goal });
      } else {
        res.status(404).json({ message: 'Goal not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
    
export default v1Router;
