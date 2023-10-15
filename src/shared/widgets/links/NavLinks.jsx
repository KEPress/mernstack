import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../../../context/context'
import './NavLinks.scss'

export const NavLinks = (props) => {

    const { userId, logout, online } = useContext(Context)

    return (<Fragment>
                <ul className={`navlinks ${props.className}`}>
                    <li><NavLink to={`/`} exact>ALL USERS</NavLink></li>
                    { online && (<li><NavLink to={`/${userId}/places`}>MY PLACES</NavLink></li>)}
                    { online && (<li><NavLink to={`/places/new`}>ADD PLACE</NavLink></li>)}
                    { !online && (<li><NavLink to={`/auth`}>AUTHENTICATE</NavLink></li>)}
                    { !online && (<li><NavLink to={`/places`}>ALL PLACES</NavLink></li>)}
                    { online && (<li><button onClick={logout}>LOGOUT</button></li>)}
                </ul>
           </Fragment>)
}
