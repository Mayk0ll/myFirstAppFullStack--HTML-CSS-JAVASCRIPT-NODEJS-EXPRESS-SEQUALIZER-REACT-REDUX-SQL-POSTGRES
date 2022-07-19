// import axios from 'axios'

export function searchBreeds(name='', filtered={breed: true, asc: true, weight: false}){
    return function(dispatch){
        console.log(name);
        fetch(`http://localhost:3001/dogs?name=${name}`)
        .then(response => response.json())
        .then(data => dispatch({type: 'BUSCAR_RAZAS', payload: data, filter:filtered}))
        .catch('Error en traer la informacion de las razas')
    }
}

// export function searchBreed(name, filtered={breed: true, asc: true, weight: false}){
//     return function(dispatch){
//         fetch(`http://localhost:3001/dogs?name=${name}`)
//         .then(response => response.json())
//         .then(data => dispatch({type: 'BUSCAR_RAZAS', payload: data, filter:filtered}))
//         .catch('Error en traer la informacion de las razas')
//     }
// }

export function detailsBreed(id){
    return function(dispatch) {
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(response => response.json())
        .then(data => dispatch({type: 'BUSCAR_DETALLES', payload: data}))
        .catch('Error en traer los detalles de la raza')
    }
}

export function searchTempers(){
    return function(dispatch){
        fetch('http://localhost:3001/tempers')
        .then(response => response.json())
        .then(data => dispatch({type: 'BUSCAR_TEMPERAMENTOS', payload: data}))
        .catch('Error en traer los temperamentos')
    }
}

export function clearDetail(){
    return({type: 'CLEAR_DETAILS'})
}