import React, { Fragment } from 'react'
import './Avatar.scss'

//To replace <div className='user-image'></div>
export const Avatar = (props) => {

    return (<Fragment>
                <div className={`avatar ${props.className}`} style={props.style}>
                    <img src={props.image} alt={props.alt} style={{ width: props.width, height: props.height }} />
                </div>
           </Fragment>)

}
