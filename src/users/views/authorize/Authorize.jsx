import React, { useState, useContext, Fragment } from 'react'
import { Context } from '../../../context/context'
import { useForm } from '../../../shared/hooks/useForm'
import { useHttp } from '../../../shared/hooks/useHttp'
import { Card } from '../../../shared/widgets/card/Card'
import { Button } from '../../../shared/widgets/button/Button'
import { Form } from '../../../shared/widgets/forms/Form'
import { Upload } from '../../../shared/widgets/upload/Upload'
import { Error } from '../../../shared/widgets/error/Error'
import { Loading } from '../../../shared/widgets/loader/Loading'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../utilities/validator'
//import axios from 'axios' 
import './Authorize.scss'


export const Authorize = () => {

    const authenticate = useContext(Context)

    const [online, setOnline] = useState(false)
    
    const { loading, error, sendRequest, clearError  } = useHttp()

    const [state, inputHandle, setForm] = useForm({
        email: { value: String(), isValid: false },
        passcode: { value: String(), isValid: false }
    }, false)

    const submitHandle = async (event) => {
        event.preventDefault()

        if (online) {

            try {
               const response =  await sendRequest(`/users/login`, 'POST', JSON.stringify({
                    email: state.inputs.email?.value,
                    passcode: state.inputs.passcode?.value
               }), { 'Content-Type':'application/json' })
               const { user, token } = response
               authenticate.login(user._id, token)
            } catch (error) {
                console.log(error)
            }
            
        } else {

            try {
                const formData = new FormData()
                formData.append('username', state.inputs.username.value)
                formData.append('email', state.inputs.email.value)
                formData.append('passcode', state.inputs.passcode.value)
                formData.append('image', state.inputs.image.value)
                const response = await sendRequest(`/users/register`, 'POST', formData)
                //check server side to see register function for the response return
                const { user, token } = response
                authenticate.login(user._id, token)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const modeHandle = () => {
        if (!online) {
            setForm({ ...state.inputs, username: undefined }, state.inputs.email.isValid && state.inputs.passcode.isValid)
        } else setForm({...state.inputs, username: { value: String(), isValid: false }}, false)
        setOnline((previous) => !previous)
    }
    
    return (<Fragment>
            <Error error={error} onClear={clearError} />
            <Card className='authenticate'>
                { loading && (<Loading asOverlay />)}
                <h2>{ online ? ('Login'):('Register') }</h2>
                <hr />
                <form onSubmit={submitHandle}>
                    {!online && (<Form element={'input'} 
                                id={'username'} 
                                type={'text'} 
                                label={'Username'} 
                                onInput={inputHandle} 
                                validators={[VALIDATOR_REQUIRE()]}
                                error={'Please enter a Username'} /> )}
                    {!online && (<Upload id={'image'} center={'center'} onInput={inputHandle} onError={'Please provide an Image'} />)}
                    <Form element={'input'} 
                          id={'email'} 
                          type={'email'} 
                          label={'E-mail'} 
                          onInput={inputHandle}
                          validators={[VALIDATOR_EMAIL()]} 
                          error={'Please enter valid email'} />
                    <Form element={'input'} 
                          id={'passcode'} 
                          type={'password'} 
                          label={'Passcode'} 
                          onInput={inputHandle}
                          validators={[VALIDATOR_MINLENGTH(6)]} 
                          error={'Please enter valid Passcode no more than 6 characters'} />
                    <Button type={'submit'} disabled={!state.valid}>{ online ? ('LOGIN'):('REGISTER')}</Button>
                </form>
                <Button inverse onClick={modeHandle}>SWITCH TO { online ? ('REGISTER'):('LOGIN')}</Button>
            </Card>
         </Fragment>)
}
