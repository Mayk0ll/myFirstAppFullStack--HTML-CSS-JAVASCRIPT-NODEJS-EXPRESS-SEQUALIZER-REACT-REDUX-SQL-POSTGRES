let initialState = {
    breeds: [],
    detailsBreed: {photo: 'https://i.gifer.com/g0R5.gif'},
    temperament:[]
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case 'BUSCAR_RAZAS':
            const {breed, asc, weight} = action.filter
            console.log(breed, asc, weight);
            if(breed){
                if(asc){
                    return {...state, 
                        breeds: action.payload.sort(( ant, act) => {if(ant.name.toLowerCase() === act.name.toLowerCase())return 0;if(ant.name.toLowerCase() > act.name.toLowerCase())return 1;return -1})}
                } else{
                    return {...state, 
                        breeds: action.payload.sort((ant, act) => {if(ant.name.toLowerCase() === act.name.toLowerCase())return 0;if(ant.name.toLowerCase() < act.name.toLowerCase())return 1;return -1})}
                }
            } else if(weight){
                if(asc){
                    return {...state, 
                        breeds: action.payload.sort(( ant, act) => {if(ant.weight.toLowerCase() === act.weight.toLowerCase())return 0;if(ant.weight.toLowerCase() > act.weight.toLowerCase())return 1;return -1})}
                } else{
                    return {...state, 
                        breeds: action.payload.sort((ant, act) => {if(ant.weight.toLowerCase() === act.weight.toLowerCase())return 0;if(ant.weight.toLowerCase() < act.weight.toLowerCase())return 1;return -1})}
                }
            }
            break;

        // case 'BUSCAR_RAZA':
        //     // const {breed, asc, weight} = action.filter
        //     if(breed){
        //         if(asc){
        //             return {...state, 
        //                 breeds: action.payload.sort(( ant, act) => {if(ant.name.toLowerCase() === act.name.toLowerCase())return 0;if(ant.name.toLowerCase() > act.name.toLowerCase())return 1;return -1})}
        //         } else{
        //             return {...state, 
        //                 breeds: action.payload.sort((ant, act) => {if(ant.name.toLowerCase() === act.name.toLowerCase())return 0;if(ant.name.toLowerCase() < act.name.toLowerCase())return 1;return -1})}
        //         }
        //     } else if(weight){
        //         if(asc){
        //             return {...state, 
        //                 breeds: action.payload.sort(( ant, act) => {if(ant.weight.toLowerCase() === act.weight.toLowerCase())return 0;if(ant.weight.toLowerCase() > act.weight.toLowerCase())return 1;return -1})}
        //         } else{
        //             return {...state, 
        //                 breeds: action.payload.sort((ant, act) => {if(ant.weight.toLowerCase() === act.weight.toLowerCase())return 0;if(ant.weight.toLowerCase() < act.weight.toLowerCase())return 1;return -1})}
        //         }
        //     }
        //     break;

        case 'BUSCAR_DETALLES':
            return {
                ...state,
                detailsBreed: action.payload
            };

        case 'CLEAR_DETAILS':
        return {
            ...state,
            detailsBreed: {photo: 'https://i.gifer.com/g0R5.gif'}
        };
        case 'BUSCAR_TEMPERAMENTOS':
        return {
            ...state,
            temperament: action.payload
        };
    
        default:
            return {...state}
    }
}

export default reducer