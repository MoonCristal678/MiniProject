// crudController.js
import { validationResult, body } from 'express-validator';
import mongoose from 'mongoose';
const addEntity = async (Entity, req, res, renderPage) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, duration, intensity, calories, protein, carbs, fat, target } = req.body;

  try {
    const collection = mongoose.connection.db.collection(Entity.collection.name);

    if (!(await collection.indexExists('name_1'))) {
      await collection.createIndex({ name: 1 }, { unique: true });
    }

    const newEntity = new Entity({
      name,
      duration,
      intensity,
      calories,
      protein,
      carbs,
      fat,
      target,
    });

    await newEntity.save();
    res.json({ message: `${Entity.modelName} added successfully`, entity: newEntity });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const updateEntity = async (Entity, req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const entityId = req.body.entityId;

  try {
    const entity = await Entity.findById(entityId);

    if (entity) {
      // Update the entity fields as needed
      Object.assign(entity, req.body);

      await entity.save();
      res.json({ message: `${Entity.modelName} updated successfully`, entity });
    } else {
      res.status(404).json({ message: `${Entity.modelName} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getEntities = async (Entity, req, res) => {
  try {
    const entities = await Entity.find({});
    res.json(entities);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteEntity = async (Entity, req, res) => {
  const entityId = req.body.entityId;

  try {
    const result = await Entity.deleteOne({ _id: entityId });

    if (result.deletedCount > 0) {
      res.json({ message: `${Entity.modelName} deleted successfully` });
    } else {
      res.status(404).json({ message: `${Entity.modelName} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export { addEntity, updateEntity, getEntities, deleteEntity };
