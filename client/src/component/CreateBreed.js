import React, { useState } from 'react'
import './estilos.css/CreateBreed_module.css'
import axios from 'axios'

export const CreateBreed = () => {

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        yearsMin: '',
        yearsMax: '',
        tempers:''
    })
    const [error, setError] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        yearsMin: '',
        yearsMax: '',
        tempers: '',
        comparationHeight: '',
        comparationWeight: '',
        comparationYear: '',
        allValidation: ''
    })
    
    const [success, setSuccess] = useState(false)

    function validate(e){
        let regName = /^[a-zA-Z]+ ?([a-zA-Z]+)?$/
        let regNum = /^[0-9]+[.]?([0-9]+)?$/
        setInput((prevInput) => {
            return {...input,
            [e.target.name] : e.target.value}
        })
        if(e.target.name === 'name' || e.target.name === 'tempers'){
            ((e.target.value === '') || (regName.test(e.target.value)))?setError((prevError) => { return {...prevError,[e.target.name]:''}}):setError((prevError) => { return {...prevError,[e.target.name]:'No se permiten numeros o caracteres especiales'}})
        } else if(e.target.name === 'yearsMin' || e.target.name === 'yearsMax'){
            if((e.target.value) && (!regNum.test(e.target.value))){
                setError((prevError) => { return {...prevError, [e.target.name]:'No se permiten letras, caracteres especiales o espacios vacios'}})
            } else if((e.target.value) && (e.target.value <= 0 || e.target.value > 20) ){
                setError((prevError) => { return {...prevError, [e.target.name]:'El rango es desde 0 a 20'}})
            } else {
                setError((prevError) => { return {...prevError, [e.target.name]:''}})
            }
        } else {
            if((e.target.value) && (!regNum.test(e.target.value))){
                setError((prevError) => { return {...prevError, [e.target.name]:'No se permiten letras, caracteres especiales o espacios vacios'}})
            } else if((e.target.value) && (e.target.value <= 0 || e.target.value > 90) ){
                setError((prevError) => { return {...prevError, [e.target.name]:'El rango es desde 0.1 a 90'}})
            } else {
                setError((prevError) => { return {...prevError, [e.target.name]:''}})
            }
        }        
        
        console.log('entre!!');
    }

    function createNewBreed(e){

        e.preventDefault();
        
        if(input.name === '' || input.heightMin === '' || input.heightMax === '' || input.weightMin === '' || input.weightMax === '' || input.yearsMin === '' || input.yearsMax === '' || input.tempers === '' ){
            return setError({...error, allValidation:'por favor llenar la informacion faltante'})
        } else if(error.name !== '' || error.heightMin !== '' || error.heightMax !== '' || error.weightMin !== '' || error.weightMax !== '' || error.yearsMin !== '' || error.yearsMax !== '' || error.tempers !== '' ){
            return setError({...error, allValidation:'Valida los campos que la informacion este correcta'})
        } else if(parseFloat(input.heightMin) > parseFloat(input.heightMax)){
            return setError({...error, allValidation:'La altura minima no debe superar la maxima'})
        } else if(parseFloat(input.weightMin) > parseFloat(input.weightMax)){
            return setError({...error, allValidation:'El peso minimo no debe superar la maxima'})
        } else if(parseFloat(input.yearsMin) > parseFloat(input.yearsMax)){
            return setError({...error, allValidation:'la edad minima no debe superar la maxima'})
        } else {
            setError({...error, allValidation:''})
        }

        let raza = {
            "name": input.name,
            "height": `${input.heightMin} - ${input.heightMax}`,
            "weight": `${input.weightMin} - ${input.weightMax}`,
            "year": `${input.yearsMin} - ${input.yearsMax}`
        }
        axios.post('http://localhost:3001/dogs',raza).then( ele => 
        setInput({
            name: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            yearsMin: '',
            yearsMax: '',
            tempers:''
        }),
        setSuccess(true)
        ).catch( err => console.log(err))        
    }

    function restart(e){
        setInput({
            name: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            yearsMin: '',
            yearsMax: '',
            tempers:''
        })
        setSuccess(false)
    }

    return (
        <div className="contenedorCreateBreed">
            {console.log(success)}
            <form className='formularioCreateBreed'>
                <div className="itemCreateBreed ">
                    <label className='tickedCreateBreed' >Nombre: </label>
                    <input key='name' type="text" name='name' className={!error.name?'inputCreateBreed':'inputCreateBreed darger'} value={input.name} onChange={validate}/>
                    {((input.name) && (error.name))? <span className='spanAlert'>{error.name}</span> : null}
                </div>
                <div className="itemCreateBreed ">
                    <label className='tickedCreateBreed'>Altura: </label>
                    <div className="containerItem">
                        <input key='heightMin' type="text" name='heightMin' className={!error.heightMin?'inputCreateBreed middleInput':'inputCreateBreed middleInput darger'} value={input.heightMin} onChange={validate}/>
                        <label className='tickedCreateBreed'> - </label>
                        <input key='heightMax' type="text" name='heightMax' className={!error.heightMax?'inputCreateBreed middleInput':'inputCreateBreed middleInput darger'} value={input.heightMax} onChange={validate}/>
                        <label className='tickedCreateBreed'> CM </label>
                    </div>
                    {error.heightMin || error.heightMax || error.comparationHeight? <span className='spanAlert'>{error.heightMin || error.heightMax || error.comparationHeight }</span> : null}
                </div>
                <div className="itemCreateBreed ">
                    <label className='tickedCreateBreed'>Peso: </label>
                    <div className="containerItem">
                        <input key='weightMin' type="text" name='weightMin' className={!error.weightMin?'inputCreateBreed middleInput':'inputCreateBreed middleInput darger'} value={input.weightMin} onChange={validate}/>
                        <label className='tickedCreateBreed'> - </label>
                        <input key='weightMax' type="text" name='weightMax' className={!error.weightMax?'inputCreateBreed middleInput':'inputCreateBreed middleInput darger'} value={input.weightMax} onChange={validate}/>
                        <label className='tickedCreateBreed'> KG </label>
                    </div>
                        {error.weightMin || error.weightMax? <span className='spanAlert'>{error.weightMin || error.weightMax }</span> : null}
                </div>
                <div className="itemCreateBreed ">
                    <label className='tickedCreateBreed'>Edad: </label>
                    <div className="containerItem">
                        <input key='yearsMin' type="text" name='yearsMin' className={!error.yearsMin?'inputCreateBreed middleInput':'inputCreateBreed middleInput darger'} value={input.yearsMin} onChange={validate}/>
                        <label className='tickedCreateBreed'> - </label>
                        <input key='yearsMax' type="text" name='yearsMax' className={!error.yearsMax?'inputCreateBreed middleInput':'inputCreateBreed middleInput darger'} value={input.yearsMax} onChange={validate}/>
                        <label className='tickedCreateBreed'> Years </label>
                    </div>
                    {error.yearsMin || error.yearsMax? <span className='spanAlert'>{error.yearsMin || error.yearsMax }</span> : null}
                </div>
                <div className="itemCreateBreed ">
                    <label className='tickedCreateBreed'>Temperamentos: </label>
                    <input key='' type="text" name='tempers'className='inputCreateBreed inputItem' value={input.tempers} onChange={validate}/>
                </div>
                <div className='containerbtn'> 
                    <input type="submit" value='Crear Raza' className='btn' onClick={createNewBreed}/>
                    <input type="submit" value='Limpiar Formulario' className='btn'/>
                </div>
                    {error.allValidation? <span className='spanAlert'>{ error.allValidation }</span> : null}
                    {success? <div className='success'>
                        <h1>SE HA CREADO EXITOSAMENTE LA NUEVA RAZA</h1>
                        <button onClick={restart}>OK</button>
                    </div> : null}
                    
            </form>
        </div>
    )
}
