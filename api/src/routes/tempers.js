const { Router } = require('express');
const axios = require('axios');
const { Temper, Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) => {
    let arrTempers = [];
    // let allTempersFiltered= []
    const respTemper = await axios.get('https://api.thedogapi.com/v1/breeds');
    respTemper.data.map((t) => {
        typeof t.temperament !== 'undefined'?
        arrTempers = [...arrTempers, ...(t.temperament.split(','))]:null;
    })
    for(let arr of arrTempers){
        let name = (arr.trim().toLowerCase())
        await Temper.findOrCreate({
            where: {name: name}
        })
        // allTempersFiltered.includes(name) ? null:allTempersFiltered.push(name)
    }
    const allTempers = await Temper.findAll({
        order: [['name', 'ASC']],
        attributes: {exclude: ["createdAt",'updatedAt']}
    })
    // console.log(allTempersFiltered.length);
    res.send(allTempers)
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