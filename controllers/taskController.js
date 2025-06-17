const { ObjectId } = require('mongodb');
const db = require('../db/conn');

const collection = () => db.getDb().collection('tasks');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await collection().find().toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
};
//hello
exports.getTaskById = async (req, res) => {
  try {
    const task = await collection().findOne({ _id: new ObjectId(req.params.id) });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, completed, categoryId, userId } = req.body;

  if (
    !title ||
    !description ||
    !dueDate ||
    !priority ||
    completed === undefined || 
    !categoryId ||
    !userId
  ) {
    return res.status(400).json({
      error: 'Missing required fields: title, description, dueDate, priority, completed, categoryId, userId',
    });
  }

  let catObjectId;
  try {
    catObjectId = new ObjectId(categoryId);
  } catch {
    return res.status(400).json({ error: 'Invalid categoryId format' });
  }

  const newTask = {
    title,
    description,
    dueDate: new Date(dueDate),     
    priority,
    completed: !!completed,          
    categoryId: catObjectId,
    userId,                           
  };

  try {
    const result = await collection().insertOne(newTask);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, priority, completed, categoryId, userId } = req.body;

  if (
    !title ||
    !description ||
    !dueDate ||
    !priority ||
    completed === undefined ||
    !categoryId ||
    !userId
  ) {
    return res.status(400).json({
      error: 'Missing required fields: title, description, dueDate, priority, completed, categoryId, userId',
    });
  }

  let catObjectId;
  try {
    catObjectId = new ObjectId(categoryId);
  } catch {
    return res.status(400).json({ error: 'Invalid categoryId format' });
  }

  try {
    const id = new ObjectId(req.params.id);
    const updateDoc = {
      $set: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        completed: !!completed,
        categoryId: catObjectId,
        userId,
      },
    };
    const result = await collection().updateOne({ _id: id }, updateDoc);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to update task or invalid ID' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await collection().deleteOne({ _id: id });
    return res.json(result);
  } catch {
    return res.status(400).json({ error: 'Failed to delete task or invalid ID' });
  }
};
