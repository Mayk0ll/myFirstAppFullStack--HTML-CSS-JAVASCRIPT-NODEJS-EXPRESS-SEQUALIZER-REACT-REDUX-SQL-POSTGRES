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
            const searchAPi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=69e2aae6-9fef-4d00-b47c-8767a1b8c9dc`);
            // const searchAPi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=pug&api_key=69e2aae6-9fef-4d00-b47c-8767a1b8c9dc`);
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
                let temps = breed.temperament?breed.temperament:'';
                let phot= '';
                if(breed.image){
                    phot = breed.image.url;
                } else {
                    phot = breed.reference_image_id?`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`:'https://media.istockphoto.com/vectors/wiener-dog-dressed-as-a-hot-dog-vector-illustration-vector-id1170183630?k=20&m=1170183630&s=612x612&w=0&h=vCO395llIWCLGXx1UQ2ryILW8gdK18Pkpfcgd4j9cCQ='
                }
                return {
                    id: breed.id,
                    name: breed.name,
                    height: breed.height.metric,
                    weight: breed.weight.metric,
                    years: breed.life_span,
                    temper: temps,
                    photo: phot
                }
            });
            const allResp = [...respApi, ...respBDFiltered];
            

            return res.json(allResp);
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
            if(filterApi){
                let temps = filterApi.temperament?filterApi.temperament:'';
                let phot= '';
                    if(filterApi.image){
                        phot = filterApi.image.url;
                    } else {
                        phot = filterApi.reference_image_id?`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`:'https://media.istockphoto.com/vectors/wiener-dog-dressed-as-a-hot-dog-vector-illustration-vector-id1170183630?k=20&m=1170183630&s=612x612&w=0&h=vCO395llIWCLGXx1UQ2ryILW8gdK18Pkpfcgd4j9cCQ='
                    }
                const searchApi = {
                    id: filterApi.id,
                    name: filterApi.name,
                    height: filterApi.height.metric,
                    weight: filterApi.weight.metric,
                    years: filterApi.life_span,
                    temper: temps,
                    photo: phot
                }
                return res.send(searchApi)
            } else {
                const searchApi = {
                    id: 'error' ,
                    name: 'error' ,
                    height: 'error' ,
                    weight: 'error' ,
                    years: 'error' ,
                    temper: 'error',
                    photo: 'error'
                }
                return res.send(searchApi)
            }
            
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
    console.log(req.body);
    try {
        const {name, height, weight, year, tempers} = req.body
        const newBreed = await Dog.create({
            name,
            height,
            weight,
            year,
        });  
        let breed = await Dog.findOne({ where: {name: name} }) ;
        console.log(breed, typeof breed);
        await breed.addTemper(tempers);
        
        return res.send(newBreed)  
    } catch (error) {
        return res.status(400).send('Error al Crear Raza')
    }
})

router.post('/:id', async (req, res, next) => {
    const {id} = req.params 
    const {tempers} = req.body
    console.log(tempers); 
    let breed = await Dog.findByPk(id) ;
    console.log(breed, typeof breed);
    const newIdxTemper = breed.addTemper(tempers);
    res.send('newIdxTemper')
})

router.delete('/', (req, res, next) => {
    res.send('Soy delete de Dogs')
})

module.exports = router;
