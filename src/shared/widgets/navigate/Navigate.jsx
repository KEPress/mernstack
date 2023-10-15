import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../header/Header'
import { Links } from '../links/Links'
import { Sidebar } from '../sidebar/Sidebar'
import { Backdrop } from '../backdrop/Backdrop'
import './Navigate.scss'

export const Navigate = (props) => {

    const [drawer, setDrawer] = useState(false)

    const menuHandle = () => {
        setDrawer(true)
    }

    const closeMenu = () => {
        setDrawer(false)
    }

    return (<Fragment>
                { drawer && (<Backdrop onClick={closeMenu} />) }
                <Sidebar show={drawer} onClick={closeMenu}><nav className='navigate-side'><Links /></nav></Sidebar>
                <Header>
                    <button className='navigate-btn' onClick={menuHandle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <h1 className='navigate-title'><Link to={`/`}>Just Visiting</Link></h1>
                    <nav className='navigate-head'><Links /></nav>
                </Header>
           </Fragment>)

}
