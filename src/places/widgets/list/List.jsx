import React, { Fragment } from 'react'
//import { useRouteLoaderData } from 'react-router-dom'
import { Item } from '../item/Item'
import { Card } from '../../../shared/widgets/card/Card'
import { Button } from '../../../shared/widgets/button/Button'
import './List.scss'

//NOTE: remember to access prop elements it is props.items
export const List = ({ items, onDeletePlace }) => {

    if (items.places.length === 0) {
         
        return (<Fragment>
                <div className='places center'>
                    <Card>
                        <h2>No Places found. Create one</h2>
                        <Button type={'link'} to={`/places/new/`}>Share a Place</Button>
                    </Card>
                </div>
            </Fragment>)

    } else return (<Fragment>
                <ul className='places'>
                    { items.places.map((place) => <Item key={place._id} 
                      placeId={place._id} image={place.image} title={place.title} details={place.details} 
                    address={place.address} author={place.author} location={place.location} onDelete={onDeletePlace}/>)}
                </ul>
            </Fragment>)
   

}
