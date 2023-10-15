import { useCallback, useReducer } from 'react'


const Reducer = (state, action) => {
    switch (action.type) {
        case 'INPUT':   let validCheck = true
                        for (const id  in state.inputs) {
                            if (!state.inputs[id]) continue
                            if (id === action.id) validCheck = validCheck && (action.isValid)
                            else validCheck = validCheck && (state.inputs[id].isValid)
                        }
                        return {...state, inputs: {...state.inputs, [action.id]: { value: action.value, isValid: action.isValid }}, valid: validCheck }
        case 'DATA_SET': return { inputs: action.inputs, valid: action.validCheck }
        default: return state
    }
}

export const useForm = (formInput, formValid) => {

    const initialState = {
        inputs: formInput,
        isValid: formValid
    }

    const [state, dispatch] = useReducer(Reducer, initialState)

    const inputHandle = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT', id: id,  value: value, isValid: isValid })
    }, [])

    const setForm = useCallback((data, formValidity) => {
        dispatch({ type: 'DATA_SET', inputs: data, isValid: formValidity })
    }, [])

    return ([state, inputHandle, setForm])
}
