import React, { Fragment } from 'react'
import { UserItem  } from '../item/UserItem'
import { Card } from '../../../shared/widgets/card/Card'
import './UserList.scss'

export const UserList = (props) => {

    if (props.items.length === 0) return (<Fragment><div className='center'><Card><h2>No Users</h2></Card></div></Fragment>)
    else return (<Fragment>
                    <ul className='users-list'>{props.items.map((user) => (
                        <UserItem key={user.id} id={user.id} image={user.image} name={user.name} count={user.places}/> 
                    ))}</ul>
                </Fragment>)
    

   

}
