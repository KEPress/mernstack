import React, { Fragment, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../shared/hooks/useForm'
import { useHttp } from '../../../shared/hooks/useHttp'
import { Form } from '../../../shared/widgets/forms/Form'
import { Button } from '../../../shared/widgets/button/Button'
import { Loading } from '../../../shared/widgets/loader/Loading'
import { Upload } from '../../../shared/widgets/upload/Upload'
import { Error  } from '../../../shared/widgets/error/Error'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utilities/validator'
import { Context } from '../../../context/context'
import './NewPlace.scss'


export const NewPlace = () => {

     const { token } = useContext(Context)

     const navigate = useNavigate()
    
     const { loading, error, sendRequest, clearError } = useHttp()

     const [state, inputHandle] = useForm({
          title: { value: String(), isValid: false },
          address: { value: String(), isValid: false },
          image: { value: null, isValid: false },
          details: { value: String(), isValid: false },
     }, false)

     const submitHandle =  async (event) => {
          event.preventDefault()

          try {
               const formData = new FormData()
               formData.append('title', state.inputs.title.value)
               formData.append('address', state.inputs.address.value)
               formData.append('image', state.inputs.image.value)
               formData.append('details', state.inputs.details.value)
               await sendRequest(`/places`, 'POST', formData, { Authorization: `Bearer ${token}` })
               navigate(`/`)
          } catch (error) {
               console.log(error)
          }
     }

     return (<Fragment>
               <Error error={error} onClear={clearError} />
               <form className='register-place' onSubmit={submitHandle}>
                    { loading && (<Loading asOverlay />)}
                    <Form element={'input'} id={'title'} type={'text'} label={'title'} validators={[VALIDATOR_REQUIRE()]} onInput={inputHandle} error={'Please enter valid Title'} />
                    <Form element={'input'} id={'address'} type={'text'} label={'address'} validators={[VALIDATOR_REQUIRE()]} onInput={inputHandle} error={'Please enter valid Address'} />
                    <Upload id={'image'} onInput={inputHandle} onError={'Please provide an Image'} />
                    <Form element={'textarea'} id={'details'} type={'text'} label={'details'} validators={[VALIDATOR_MINLENGTH(5)]} onInput={inputHandle} error={'Please enter Place Details'} />
                    <Button type={'submit'} disabled={!state.valid}>ADD PLACE</Button> 
               </form>
           </Fragment>)
}





