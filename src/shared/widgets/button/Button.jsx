import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

export const Button = (props) => {
  
    const { type, size, inverse, danger, href, to, exact, onClick, disabled, children } = props

    switch (type) {
        case 'anchor': return (<a className={`button-${size || 'default'} ${inverse && ('inverse')} ${danger && ('danger')}`} href={href}>{children}</a>)
        case 'link': return (<Link to={to} exact={exact} className={`button button-${size || 'default'} ${inverse && ('inverse')} ${danger && ('danger')}`}>{children}</Link>)
        default: return (<Fragment>
                            <button className={`button button-${size || 'default'} ${inverse && ('inverse')} ${danger && ('danger')}`} type={type} onClick={onClick} disabled={disabled}>{children}</button>
                        </Fragment>)
    }
  
}
