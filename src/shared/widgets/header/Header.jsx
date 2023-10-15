import React, { Fragment } from 'react'
import './Header.scss'

//props.chidlren serves as a placeholder for content you want to pass 
export const Header = (props) => {

    return (<Fragment>
                <header className='main-header'>
                    {props.children}
                </header>
           </Fragment>)

}
