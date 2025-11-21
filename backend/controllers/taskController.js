const Joi = require('joi');
const Task = require('../models/Task');

const createSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

const updateSchema = Joi.object({
  title: Joi.string().min(1).optional(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

exports.createTask = async (req, res) => {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = await Task.create({
      title: value.title,
      description: value.description || '',
      status: value.status || 'pending',
      createdBy: req.user.id,
    });

    return res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';

    const filter = {};
    if (req.user.role !== 'admin') {
      filter.createdBy = req.user.id;
    }
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [total, tasks] = await Promise.all([
      Task.countDocuments(filter),
      Task.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'username role'),
    ]);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      tasks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('createdBy', 'username role');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && String(task.createdBy._id || task.createdBy) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { error, value } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && String(task.createdBy) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(task, value);
    await task.save();

    return res.json({ message: 'Task updated', task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && String(task.createdBy) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await task.deleteOne();
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};