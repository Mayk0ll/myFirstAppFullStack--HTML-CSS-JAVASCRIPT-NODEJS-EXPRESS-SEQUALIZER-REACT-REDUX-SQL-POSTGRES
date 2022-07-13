import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { searchBreeds, searchBreed } from "../store/actions/index";
import { Breed } from './Breed';
import './estilos.css/Breeds_module.css'

export const Breeds = (props) => {
    let allBreed = useSelector(state => state.breeds);
    let dispatch = useDispatch();
    const [desde, setDesde] = useState(0)
    const [hasta, setHasta] = useState(7)
    const [filter, setFilter] = useState({ breed: true, weight: false, asc: true, desc: false })
    const [search, setSearch] = useState('')
    let arr = [];
    
    arr = allBreed.filter((ab , i) => i >= desde && i <= hasta)

    useEffect( () => {
        dispatch(searchBreeds());
    },[dispatch])
    
    
    function nextPg(){
        if(hasta < allBreed.length){
            setDesde((oldDesde) => oldDesde + 8);
            setHasta((oldHasta) => oldHasta + 8);
        }
    }
    function prevPg(){
        if(desde > 0){
            setDesde((oldDesde) => oldDesde - 8);
            setHasta((oldHasta) => oldHasta - 8);
        }
    }
    function ordenarPor(e){
        e.preventDefault();
        if(e.target.value === 'raza'){
            setFilter({...filter, breed: true, weight: false})
        } else if (e.target.value === 'weight'){
            setFilter({...filter, breed: false, weight: true})
        } else if(e.target.value === 'nombre_asc'){
            setFilter({...filter, asc: true, desc: false})
        } else if(e.target.value === 'nombre_desc'){
            setFilter({...filter, asc: false, desc: true})
        } else if(e.target.name === 'searching'){
            setSearch(e.target.value)
        }

    }
    function filtrarPor(e){
        e.preventDefault();
        if(e.target.name === 'aplicarCambios'){
            dispatch(searchBreeds(filter));
        }
        if(e.target.name === 'searchFor'){
            dispatch(searchBreed(search));
        }
    }

    return (
        <>
        <div className="containerBreedsFilter">
            <div className="searchBreeds">
                <input className='filtros' type="text" placeholder='Pug..' value={search} name='searching' onChange={ordenarPor}/>
                <button className='btnFilter' name='searchFor' onClick={filtrarPor}>Buscar</button>
            </div>
            <div className="searchBreeds">
                <select className='filtros' name="filtrar" onChange={ordenarPor}>
                    <option value="raza">Raza</option>
                    <option value="weight">Peso</option>
                </select>
                <select className='filtros' name="ordenar" onChange={ordenarPor}>
                    <option value="nombre_asc">Ascendente(A-Z)(1-9)</option>
                    <option value="nombre_desc">Desendente(Z-A)(9-1)</option>
                </select>
                <button className='btnFilter' name='aplicarCambios' onClick={filtrarPor}>Aplicar filtros</button>
            </div>            
        </div>
        <div className='containerBreeds'>
            <div className="cardBreedsDetails">
            {
                arr ? arr.map((breed) => {
                    return <Breed key={breed.id} id={breed.id}image={breed.photo} name={breed.name} weight={breed.weight} temper={breed.temper}/>
                }): <div><img src="https://i.gifer.com/g0R5.gif" alt="cargando" className='gif'/></div>
            }
            </div>
            <div className="btnsPags">
                {desde > 0 ? <button onClick={prevPg} className='botonBreeds botonActive'>Anterior</button>: <button className='botonBreeds botonDisable'>Anterior</button>}
                {hasta < allBreed.length ? <button onClick={nextPg} className='botonBreeds botonActive'>Siguiente</button>:<button onClick={nextPg} className='botonBreeds botonDisable'>Siguiente</button>}
            </div>

        </div>
        </>
    )
}
