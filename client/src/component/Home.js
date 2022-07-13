import React, { useEffect } from 'react'
import './estilos.css/Home_module.css'
import { useDispatch} from "react-redux";
import { searchBreeds, searchTempers } from "../store/actions/index";

export const Home = () => {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(searchBreeds());
        dispatch(searchTempers())
    },[dispatch])

    return (
        <>
            <div className="containerHome">
                <div className="containerTextHome">
                    <h1 className='textHome'>Encuentra tu compañero ideal</h1>
                </div>
            </div>
        </>
    )
}
