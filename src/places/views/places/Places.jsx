import React, { Fragment, Suspense } from 'react'
import { json, defer, useLoaderData, Await } from 'react-router-dom'
import { List } from '../../widgets/list/List'
import axios from 'axios'

export const loadPlaces = async () => {

    try {
        const response = await axios.get(`/places`)
        return response.data
    } catch (error) {
        throw json({ message: error }, { status: 500 })
    }
}

export const loader = () => {
    return defer({ places: loadPlaces() })
}


export const Places = () => {

    const { places } = useLoaderData()

    return (<Fragment>
              <Suspense fallback={<p>Loading....</p>}>
                <Await resolve={places}>
                  { (loadPlaces) => <List items={loadPlaces} />}
                </Await>
              </Suspense>
          </Fragment>)

}
