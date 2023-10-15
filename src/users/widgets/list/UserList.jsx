import React, { Fragment } from 'react'
import { UserItem  } from '../item/UserItem'
import { Card } from '../../../shared/widgets/card/Card'
import './UserList.scss'

export const UserList = ({ users}) => {

    console.log(users)

    if (users.length === 0) return (<Fragment><div className='center'><Card><h2>No Users</h2></Card></div></Fragment>)
    else return (<Fragment>
                    <ul className='users-list'>{users.map((user) => (
                        <UserItem key={user._id} uid={user._id} image={user.image} username={user.username} count={user.places.length}/> 
                    ))}</ul>
                </Fragment>)
                
}
