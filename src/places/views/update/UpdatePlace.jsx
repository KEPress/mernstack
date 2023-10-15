import React, { Fragment, useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '../../../context/context'
import { Form } from '../../../shared/widgets/forms/Form'
import { useForm } from '../../../shared/hooks/useForm'
import { useHttp } from '../../../shared/hooks/useHttp'
import { Button } from '../../../shared/widgets/button/Button'
import { Loading } from '../../../shared/widgets/loader/Loading'
import { Error } from '../../../shared/widgets/error/Error'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utilities/validator'
import './UpdatePlace.scss'

export const UpdatePlace = () => {

    const placeId = useParams().placeId, navigate = useNavigate()

    const { userId, token } = useContext(Context)
    
    const { loading, error, sendRequest, clearError } = useHttp()

    const [loadPlace, loadedPlace] = useState(null)

    const [state, inputHandle, setForm] = useForm({
        title: { value: String(), isValid: false },
        details: { value: String(), isValid: false }
    }, false)

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const response = await sendRequest(`/places/${placeId}`)
                //on the server controller returns place Object with data stored
                loadedPlace(response.place)
                setForm({ 
                    title: { value: response.place.title, isValid: true },
                    details: { value: response.place.details, isValid: true }
                }, true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPlace()
    }, [sendRequest, setForm, placeId])

  
    const updateHandle = async (event) => {
        event.preventDefault()

        try {
            await sendRequest(`/places/${placeId}`, 'PATCH', JSON.stringify({
                title: state.inputs.title.value,
                details: state.inputs.details.value
            }), { 'Content-Type':'application/json', Authorization: `Bearer ${token}` }) 
            navigate(`/${userId}/places`)
        } catch (error) {
            console.log(error)
        }

        
    } 

    if (loading) return(<div className='center'><Loading /></div>)

    else if (!loadPlace && (!error)) return (<div className='center'><h2>Could not find Place</h2></div>)
    
    else return (<Fragment>
                    <Error error={error} onClear={clearError}  />
                    { !loading && (loadPlace) && 
                        (<form className='update-place' onSubmit={updateHandle}>
                            <Form id={'title'} 
                                element={'input'} 
                                type={'text'} label={'title'} 
                                validators={[VALIDATOR_REQUIRE()]} 
                                error={'Please enter valid title'} 
                                onInput={inputHandle} 
                                value={loadPlace.title} 
                                valid={true} />
                            <Form id={'details'} 
                                element={'textarea'} 
                                label={'details'} 
                                validators={[VALIDATOR_MINLENGTH(5)]} 
                                error={'Please enter valid details'} 
                                onInput={inputHandle} 
                                value={loadPlace.details} 
                                valid={true} />
                            <Button type={'submit'} disabled={!state.valid}>UPDATE PLACE</Button>
                        </form>)}
                </Fragment>)

}
