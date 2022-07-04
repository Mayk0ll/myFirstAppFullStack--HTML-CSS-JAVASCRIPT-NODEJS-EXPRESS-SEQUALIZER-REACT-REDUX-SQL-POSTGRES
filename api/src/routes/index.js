const { Router } = require('express');
const { route } = require('../app.js');
const dogs = require('./dogs.js');
const tempers = require('./tempers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use('/tempers', tempers);


module.exports = router;
