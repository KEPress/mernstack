import React, { Fragment, Suspense } from 'react'
import { json, defer, useRouteLoaderData, Await } from 'react-router-dom'
import { List } from '../../widgets/list/List'
import axios from 'axios'

export const loadPlaces = async (id) => {
   
    try {
        const response = await axios.get(`/places/user/${id}`)
        return response.data
    } catch (error) {
        throw json({ message: error}, { status: 500 })
    }
}

export const loader = async ({ request, params }) => {
    //remember URL endpoint on the route setup on App.jsx file
    const id = params.uid
    return defer({ places: await loadPlaces(id)})
}

export const UserPlaces = () => {

    const { places } = useRouteLoaderData('user-places')

    const placeRemoval = (placeId) => {
       places.filter((place) => place.id !== placeId)
    }
   
    return (<Fragment>
                <Suspense>
                    <Await resolve={places}>
                        { (userPlace) => <List items={userPlace} onDeletePlace={placeRemoval}  />}
                    </Await>
                </Suspense>
            </Fragment>)
}
