import React, { Fragment } from 'react'
import './Loading.scss'

export const Loading = (props) => {

  return (<Fragment>
            <div className={`${props.Overlay && ('spinner-overlay')}`}>
                <div className='load-dual-rings' />
            </div>
         </Fragment>)
}
