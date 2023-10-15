import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './layout/Root'
import { Users } from './users/views/users/Users'
import { NewPlace } from './places/views/new/NewPlace'
import { Places } from './places/views/places/Places'


export const App = () => {

  const router = createBrowserRouter([

    { path: `/`, id: 'root', element: <Root />, children: [
        { index: true,  element: <Users /> },
        { path: `places`, id: 'places', children: [
            { index: true, element: <Places /> },
            { path: `new`, element: <NewPlace /> }
        ]}
    ]}
  
  ])

  return (<React.Fragment>
            <RouterProvider router={router} />
        </React.Fragment>)

}

