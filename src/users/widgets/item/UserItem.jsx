import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../../shared/widgets/avatar/Avatar'
import { Card } from '../../../shared/widgets/card/Card'

import './UserItem.scss'

export const UserItem = ({ uid, username, image, count}) => {

    return (<Fragment>
            <li className='user-item'>
                <Card className='user-item'>
                    <Link to={`/${uid}/places`}>                   
                        <Avatar className='user-image' image={`${process.env.REACT_APP_IMAGE}/${image}`} alt={username} />
                        <div className='user-info'>
                            <h2>{username}</h2>
                            <h3>{count} {count === 1 ? ('Place'):('Places')}</h3>
                        </div>
                    </Link>
                </Card>
            </li>
        </Fragment>)

}
