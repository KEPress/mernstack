import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../context/context'

export const Private = ({ children }) => {

    const authenticate = useContext(Context)

    if (!authenticate.online) return (<Navigate to={`/`} />)

    return children

}
