import React, { Fragment, Suspense } from 'react'
import { json, defer, useLoaderData, Await } from 'react-router-dom'
import { UserList } from '../../widgets/list/UserList'
import { Loading } from '../../../shared/widgets/loader/Loading'
import { useHttp } from '../../../shared/hooks/useHttp'
//import { USERS } from '../../../dummy'
import axios from 'axios' //can also use axios package for api calls


export const loadUsers = async () => {

    try {
        const response = await axios.get(`/users`)
        return response.data
    } catch (error) {
        throw json({ message: error }, { status: 500 })
    }
    
}

export const loader = () => {
    return defer({ users: loadUsers() })
}

export const Users = () => {

    const { users } = useLoaderData()

    const { loading } = useHttp()

    return (<Fragment>
                <Suspense fallback={loading && (<Loading asOverlay />)}>
                    <Await resolve={users}>
                        { (loadUsers) => <UserList users={loadUsers} />}
                    </Await> 
                </Suspense>
           </Fragment>)

}
