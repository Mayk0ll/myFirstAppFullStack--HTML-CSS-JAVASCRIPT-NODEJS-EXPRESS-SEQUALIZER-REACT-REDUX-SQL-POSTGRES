import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchTempers } from "../store/actions/index";
import './estilos.css/Tempers_module.css'


export const Tempers = (props) => {
    
    let allTempers = useSelector((state) => state.temperament)
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchTempers());
    }, [dispatch])


    return (
        <div className='containerTempers'>
            <div className="cardTempers">
            {
                allTempers? 
                (allTempers.map((temper, i = 0)=> {
                    i++
                    return  (<p key={temper.id} className='textTempers'> <span> {i}» </span> {temper.name}</p>)
                    }))
                : 'no se encontro la informacion'
            }
            </div>
        </div>
    )
}
