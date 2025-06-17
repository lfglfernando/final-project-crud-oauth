const { ObjectId } = require('mongodb');
const db = require('../db/conn');

const collection = () => db.getDb().collection('projects');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await collection().find().toArray();
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await collection().findOne({ _id: new ObjectId(req.params.id) });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

exports.createProject = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Project name is required' });

  try {
    const result = await collection().insertOne({ name });
    res.status(201).json(result);
  } catch {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.updateProject = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Project name is required' });

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

exports.deleteProject = async (req, res) => {
  try {
    const result = await collection().deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch {
    res.status(400).json({ error: 'Delete failed or invalid ID' });
  }
};
