const { Router } = require('express');
const { Dog } = require('../db.js');
const axios = require('axios');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res, next) => {
    try {
        const breedBD = await Dog.findAll();
        const breedsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
        
        if(name){
            console.log('name');
        } else {
            const resps = breedsApi.data.map(breed => {
                return {
                    id: breed.id,
                    name: breed.name,
                    height: breed.height.metric,
                    weight: breed.weight.metric,
                    years: breed.life_span,
                    temper: breed.temperament,
                    photo: breed.image.url
                }
            });
            return res.send(resps);
        }
    } catch (error) {
        return res.status(400).send('Error en traer los datos');
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, height, weight, year} = req.body
        console.log(req.body);
        const newBreed = await Dog.create({
            name,
            height,
            weight,
            year,
        });  
        return res.send(newBreed)  
    } catch (error) {
        return res.status(400).send('Error al Crear Raza')
    }
})

router.put('/', (req, res, next) => {
    res.send('Soy get de Dogs')
})

router.delete('/', (req, res, next) => {
    res.send('Soy delete de Dogs')
})

module.exports = router;
