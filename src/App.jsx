import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Context } from './context/context'
import { Root } from './layout/Root'
import { Users, loader as loadUsers } from './users/views/users/Users'
//import { Authorize } from './users/views/authorize/Authorize'
//import { NewPlace } from './places/views/new/NewPlace'
//import { UpdatePlace } from './places/views/update/UpdatePlace'
import { Places } from './places/views/places/Places'
import { UserPlaces, loader } from './places/views/user/UserPlaces'
import { useAuthorize } from './shared/hooks/useAuthorize'
import { Private } from './utilities/private'

//lazy loading
const Authorize = lazy(() => import('./users/views/authorize/Authorize'))
const NewPlace = lazy(() => import('./places/views/new/NewPlace'))
const UpdatePlace = lazy(() => import('./places/views/update/UpdatePlace'))

export const App = () => {

    const { userId, token, login, logout } = useAuthorize()

    const router = createBrowserRouter([

        { path: `/`, id: 'root', 
            element: (<Context.Provider value={{ online: !!token, token: token, userId: userId, login: login, logout: logout }}>
                        <Root />
                    </Context.Provider>), 
            children: [
                { index: true,  element: <Users />, loader: loadUsers },
                { path: `auth`, element: <Authorize />},
                { path: `:uid`, element: <UserPlaces /> , id: 'user-places', loader: loader, children: [
                    { path: `places`, id: 'places', children: [
                        { index: true, element: <Places />} 
                    ]}
                ]},
                { path: `places`, children: [
                    { path: `new`, element: (<Private><NewPlace /></Private>)  },
                    { path: `:placeId`, element: (<Private><UpdatePlace /></Private>)  }
                ]},
            ]}
        ])

    return (<React.Fragment>
               <Suspense fallback={<div>Loading...</div>}> 
                    <RouterProvider router={router} />
               </Suspense>
            </React.Fragment>)
}

