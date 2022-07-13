import React from 'react'
import './estilos.css/Breed_module.css'
import { Link } from "react-router-dom";

export const Breed = ({name, weight, image, temper, id}) => {
    return (
        <Link to={`/detalle/${id}`} className='linke'>
        <div className="containerCard">
            <div className="card">
                <div className="imageCard">
                    <img src={image} alt="Imagen Perro" className='imgCard' />
                </div>
                <div className="textCard">
                    <p className='infoCard'> <span>Nombre:</span> {name}</p>
                    <p className='infoCard'> <span>Peso:</span> {weight} KG</p>
                    <p className='infoCard'> <span>Temperamento:</span> {temper}</p>
                </div>
            </div>
        </div>
        </Link>
    )
}
