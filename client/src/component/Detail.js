import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsBreed, clearDetail } from "../store/actions/index";
import './estilos.css/Detail_module.css'

export const Detail = (props) => {
    let params = props.match.params.id;
    let details = useSelector(state => state.detailsBreed);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsBreed(params))
        return () => {dispatch(clearDetail())}
    }, [dispatch, params])
    console.log(details);
    return (
        <div className="containerDetails">
            <div className="details">
                <div className="imageDetails">
                    <img src={details.photo} alt="Imagen Perro" className='imgDetails' />
                </div>
                <div className="textDetails">
                    <p className='infoDetails'> <span>Nombre Raza:</span> {details.name}</p>
                    <p className='infoDetails'> <span>Peso:</span> {details.weight} KG</p>
                    <p className='infoDetails'> <span>Temperamento:</span> {details.temper}</p>
                    <p className='infoDetails'> <span>Altura:</span> {details.height} CM</p>
                    <p className='infoDetails'> <span>Edad Promedio:</span> {details.years}</p>
                </div>
            </div>
        </div>
    )
}
