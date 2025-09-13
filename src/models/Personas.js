const { Schema, model } = require('mongoose');

const personaSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    edad:   { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

module.exports = model('Persona', personaSchema);
