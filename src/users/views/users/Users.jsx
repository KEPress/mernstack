import React, { Fragment } from 'react'
import { UserList } from '../../widgets/list/UserList'
import { USERS } from '../../../dummy'

export const Users = () => {

    return (<Fragment>
                <UserList items={USERS} />
           </Fragment>)

}
