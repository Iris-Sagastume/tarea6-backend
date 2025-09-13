const Persona = require('../models/Personas');

// Crear 1
exports.create = async (req, res) => {
  try {
    const persona = await Persona.create(req.body);
    res.status(201).json(persona);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Leer todos
exports.findAll = async (_req, res) => {
  try {
    const list = await Persona.find().lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leer por ID
exports.findOne = async (req, res) => {
  try {
    const item = await Persona.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar por ID
exports.updateById = async (req, res) => {
  try {
    const updated = await Persona.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar por ID
exports.deleteById = async (req, res) => {
  try {
    const deleted = await Persona.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ ok: true, id: deleted._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar masivo: ids por query ?ids=a,b,c o en body { "ids": ["a","b","c"] }
exports.deleteMany = async (req, res) => {
  try {
    const ids = req.body?.ids || (req.query?.ids ? req.query.ids.split(',') : []);
    if (!ids.length) return res.status(400).json({ error: 'Proporciona ids' });
    const r = await Persona.deleteMany({ _id: { $in: ids } });
    res.json({ ok: true, deletedCount: r.deletedCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Crear masivo: acepta body como array o { data: [...] }
exports.createMany = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : req.body?.data;
    if (!Array.isArray(data) || !data.length)
      return res.status(400).json({ error: 'Envía un array de objetos' });
    const inserted = await Persona.insertMany(data, { ordered: false });
    res.status(201).json({ ok: true, insertedCount: inserted.length, inserted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
