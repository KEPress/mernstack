import React, { Fragment } from 'react'
import './Card.scss'

export const Card = (props) => {

    return (<Fragment>
                <div className={`card ${props.className}`} style={props.style}>{props.children}</div>
           </Fragment>)
}
