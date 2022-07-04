const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res, next) => {
    res.send('Soy get de Temper')
})

router.post('/', (req, res, next) => {
    res.send('Soy post de Temper')
})

router.put('/', (req, res, next) => {
    res.send('Soy get de Temper')
})

router.delete('/', (req, res, next) => {
    res.send('Soy delete de Temper')
})

module.exports = router;