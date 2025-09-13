const router = require('express').Router();
const ctrl = require('../controllers/personas.controller');

router.post('/', ctrl.create);          // Crear 1
router.get('/', ctrl.findAll);          // Leer todos
router.get('/:id', ctrl.findOne);       // Leer por ID
router.put('/:id', ctrl.updateById);    // Actualizar por ID
router.delete('/:id', ctrl.deleteById); // Eliminar por ID

// Masivos
router.delete('/', ctrl.deleteMany);    // Eliminar en masa
router.post('/bulk', ctrl.createMany);  // Crear en masa

module.exports = router;
