import React, { Fragment, useEffect, useReducer } from 'react'
import { validate } from '../../../utilities/validator'
import './Form.scss'


const Reducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE': return {...state, value: action.payload, isValid: validate(action.payload, action.validators) }
        case 'TOUCH': return {...state, touched: true }
        default: return state
    }
}

export const Form = (props) => {

    const initialState = {
        value: props.value || (String()),
        touched: false,
        isValid: props.valid || (false)
    }
    
    const [state, dispatch] = useReducer(Reducer, initialState)

    const { id, onInput } = props

    const { value, touched, isValid } = state

    const changeHandle = (event) => {
        dispatch({ type: 'CHANGE', payload: event.target.value, validators: props.validators })
    }

    const touchHandle = (event) => {
        dispatch({ type: 'TOUCH' })
    }

    const element = props.element === 'input' ? (<input id={props.id} type={props.type} placeholder={props.placeholder} value={value} onBlur={touchHandle} onChange={changeHandle} />) : (<textarea id={props.id} value={value} onBlur={touchHandle} onChange={changeHandle} rows={props.rows || 3} />)

    useEffect(() => {
       onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    return (<Fragment>
                <div className={`form-control ${!isValid && touched && ('form-control-invalid')}`}>
                    <label htmlFor={props.id}>{props.label}</label>
                    {element}
                    {!isValid && (touched) && (<p>{props.error}</p>)}
                </div>
           </Fragment>)

}