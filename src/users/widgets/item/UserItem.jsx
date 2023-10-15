import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../../shared/widgets/avatar/Avatar'
import { Card } from '../../../shared/widgets/card/Card'

import './UserItem.scss'

export const UserItem = (props) => {

  return (<Fragment>
            <li className='user-item'>
                <Card className='user-item'>
                    <Link to={`/${props.id}/places`}>                   
                        <Avatar className='user-image' image={props.image} alt={props.name} />
                        <div className='user-info'>
                            <h2>{props.name}</h2>
                            <h3>{props.count} {props.count === 1 ? ('Place'):('Places')}</h3>
                        </div>
                    </Link>
                </Card>
            </li>
        </Fragment>)

}
