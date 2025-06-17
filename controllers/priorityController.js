const { ObjectId } = require('mongodb');
const db = require('../db/conn');

const collection = () => db.getDb().collection('priorities');

exports.getAllPriorities = async (req, res) => {
  try {
    const priorities = await collection().find().toArray();
    res.json(priorities);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve priorities' });
  }
};

exports.getPriorityById = async (req, res) => {
  try {
    const priority = await collection().findOne({ _id: new ObjectId(req.params.id) });
    if (!priority) return res.status(404).json({ error: 'Priority not found' });
    res.json(priority);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

exports.createPriority = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Priority name is required' });

  try {
    const result = await collection().insertOne({ name });
    res.status(201).json(result);
  } catch {
    res.status(500).json({ error: 'Failed to create priority' });
  }
};

exports.updatePriority = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Priority name is required' });

  try {
    const result = await collection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name } }
    );
    res.json(result);
  } catch {
    res.status(400).json({ error: 'Update failed or invalid ID' });
  }
};

exports.deletePriority = async (req, res) => {
  try {
    const result = await collection().deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch {
    res.status(400).json({ error: 'Delete failed or invalid ID' });
  }
};
