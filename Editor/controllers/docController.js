const Document = require('../models/Document');

exports.createDoc = async (req, res) => {
  const doc = await Document.create({
    title: req.body.title,
    content: '',
    createdBy: req.user._id
  });
  res.json(doc);
};

exports.getDocs = async (req, res) => {
  const docs = await Document.find({ createdBy: req.user._id });
  res.json(docs);
};

exports.getDocById = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

exports.updateDoc = async (req, res) => {
  const doc = await Document.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content, updatedAt: Date.now() },
    { new: true }
  );
  res.json(doc);
};

