import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from '../shared/widgets/navigate/Navigate'

export const Root = () => {

    return (<Fragment><Navigate /><Outlet /></Fragment>)

}
