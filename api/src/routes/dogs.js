const { Router } = require('express');
const { Dog, Op } = require('../db.js');
const axios = require('axios');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res, next) => {
    try {
        const {name} = req.query
        if(name){
            const searchAPi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
            const respBD = await Dog.findAll({
                where: {
                    name: {[Op.iLike]:`%${name}%` }
                }
            });
            const respApi= searchAPi.data.map(breed => {
                return {
                        id: breed.id,
                        name: breed.name,
                        height: breed.height.metric,
                        weight: breed.weight.metric,
                        years: breed.life_span,
                        temper: breed.temperament,
                        photo: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
                }
            });
            const allResp = [...respApi, ...respBD];
            return res.send(allResp.length > 0 ? allResp:`No se encuentra razas con el nombre: ${name}`);
        } else {
            const breedsBD = await Dog.findAll();
            const resp = await axios.get('https://api.thedogapi.com/v1/breeds');
            const breedsApi = resp.data.map(breed => {
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
            console.log(breedsApi.length);
            const allBreeds = [...breedsApi, ...breedsBD];
            return res.send(allBreeds ? allBreeds:'Error en traer los datos');
        }
    } catch (error) {
        return res.status(400).send('Error en traer los datos');
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        if(id.length <= 3){
            const resp = await axios.get('https://api.thedogapi.com/v1/breeds');
            const filterApi = resp.data.filter(breed => id == breed.id);
            const searchApi = filterApi.map(breed => {
                return {
                    id: breed.id,
                    name: breed.name,
                    height: breed.height.metric,
                    weight: breed.weight.metric,
                    years: breed.life_span,
                    temper: breed.temperament,
                    photo: breed.image.url
                }
            })
            return res.send(searchApi? searchApi:'no se encontraron resultados con ese ID')
        } else {
            id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')?
            (res.send(await Dog.findByPk(id)? await Dog.findByPk(id):'no se encontraron resultados con ese ID'))
            :res.send('ID invalido, verifica la informacion')
        }
    } catch (error) {
        res.status(400).send('Error en buscar el id')
    }
});

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
