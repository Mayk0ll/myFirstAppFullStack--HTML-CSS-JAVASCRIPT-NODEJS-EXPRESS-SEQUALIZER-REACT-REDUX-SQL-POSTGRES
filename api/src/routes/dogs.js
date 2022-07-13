const { Router } = require('express');
const { Dog, Temper, Op } = require('../db.js');
const axios = require('axios');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const apiKey = '69e2aae6-9fef-4d00-b47c-8767a1b8c9dc'
router.get('/', async (req, res, next) => {
    try {
        const {name} = req.query
        if(name){
            const searchAPi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
            const respBD = await Dog.findAll({
                where: {
                    name: {[Op.iLike]:`%${name}%` },
                },
                include: [{
                    model: Temper
                }]
            });
            const respBDFiltered = respBD.map((breed) => {
                let arr = [];
                breed.tempers.map((t) => {
                    arr.includes(t.name)? null:arr.push(t.name)
                });
                let temps = arr.join(', ')
                return {
                    id: breed.id,
                    name: breed.name,
                    height: breed.height,
                    weight: breed.weight,
                    years: breed.year,
                    temper: temps,
                    photo: breed.photo
                }
            })

            const respApi= searchAPi.data.map(breed => {
                let temps = breed.temperament?breed.temperament:''
                return {
                        id: breed.id,
                        name: breed.name,
                        height: breed.height.metric,
                        weight: breed.weight.metric,
                        years: breed.life_span,
                        temper: temps,
                        photo: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
                }
            });
            const allResp = [...respApi, ...respBDFiltered];
            return res.send(allResp.length > 0 ? allResp:`No se encuentra razas con el nombre: ${name}`);
        } else {
            const breedsBD = await Dog.findAll({
                include: [{model: Temper}]
            });
            const breedsBDFiltered = breedsBD.map((breed) => {
                let arr = [];
                breed.tempers.map((t) => {
                    arr.includes(t.name)? null:arr.push(t.name)
                });
                let temps = arr.join(', ')
                return {
                    id: breed.id,
                    name: breed.name,
                    height: breed.height,
                    weight: breed.weight,
                    years: breed.year,
                    temper: temps,
                    photo: breed.photo
                }
            })
            const resp = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
            const breedsApi = resp.data.map(breed => {
                let temps = breed.temperament?breed.temperament:''
                return {
                    id: breed.id,
                    name: breed.name,
                    height: breed.height.metric,
                    weight: breed.weight.metric,
                    years: breed.life_span,
                    temper: temps,
                    photo: breed.image.url
                }
            });
            const allBreeds = [...breedsApi, ...breedsBDFiltered];
            // const sendBreeds = allBreeds.filter((ab , i) => i >= desde && i <= hasta)
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
            const filterApi = resp.data.find(breed => id == breed.id);
            let temps = filterApi.temperament?filterApi.temperament:''
            const searchApi = {
                id: filterApi.id,
                name: filterApi.name,
                height: filterApi.height.metric,
                weight: filterApi.weight.metric,
                years: filterApi.life_span,
                temper: temps,
                photo: filterApi.image.url
            }
            return res.send(searchApi? searchApi:'no se encontraron resultados con ese ID')
        } else {
            if(id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')){
                const found = await Dog.findOne({
                    where: {id:id},
                    include: [{model: Temper}]
                })
                let arr = [];
                found.tempers.map((t) => {
                    arr.includes(t.name)? null:arr.push(t.name)
                });
                let temps = arr.join(', ')
                const breedFound =  {
                    id: found.id,
                    name: found.name,
                    height: found.height,
                    weight: found.weight,
                    years: found.year,
                    temper: temps,
                    photo: found.photo
                }

                breedFound ? res.send (breedFound):res.send('Raza no encontrada');
            } else {
                res.send('ID invalido, verifica la informacion')
            }
        }
    } catch (error) {
        res.status(400).send('Error en buscar el id');4482141
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {name, height, weight, year} = req.body
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

router.put('/:id/:temper', async (req, res, next) => {
    const {id, temper} = req.params
    let breed = await Dog.findByPk(id) ;
    const newIdxTemper = breed.addTemper([temper]);
    res.send('Soy get de Dogs')
})

router.delete('/', (req, res, next) => {
    res.send('Soy delete de Dogs')
})

module.exports = router;
