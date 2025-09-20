require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const personasRouter = require('./routes/personas.routes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req, res) => res.json({ message: 'API OK' }));
app.use('/api/personas', personasRouter);

const { MONGODB_URI, PORT = 3000 } = process.env;
mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  });
