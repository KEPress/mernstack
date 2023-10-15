import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import './styles/Links.scss'

export const Links = (props) => {

    return (<Fragment>
                <ul className='navlinks'>
                    <li><NavLink to={`/`} exact>ALL USERS</NavLink></li>
                    <li><NavLink to={`/u1/places`}>MY PLACES</NavLink></li>
                    <li><NavLink to={`/places/new`}>ADD PLACE</NavLink></li>
                    <li><NavLink to={`/auth`}>AUTHENTICATE</NavLink></li>
                </ul>
           </Fragment>)

}
