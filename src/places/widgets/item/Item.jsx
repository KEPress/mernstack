import React, { Fragment, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context  } from '../../../context/context'
import { useHttp } from '../../../shared/hooks/useHttp'
import { Card } from '../../../shared/widgets/card/Card'
import { Button } from '../../../shared/widgets/button/Button'
import { Modal } from '../../../shared/widgets/modal/Modal'
import { Map } from '../../../shared/widgets/map/Map'
import { Loading } from '../../../shared/widgets/loader/Loading'
import { Error } from '../../../shared/widgets/error/Error'
import './Item.scss'


export const Item = ({ placeId, title, address, image, details, author, location, onDelete }) => {

    const navigate = useNavigate()
    
    const { userId, token } = useContext(Context)

    const {loading, error, sendRequest, clearError } = useHttp()

    const [map, setMap] = useState(false)

    const [show, setShow] = useState(false)

    const openMapHandle = () => setMap(true)
    
    const closeMapHandle = () => setMap(false)
    
    const deleteOption = () => setShow(true)
    
    const cancelHandle = () => setShow(false)
    
    const deleteConfirm = async () => {
        setShow(false)
        
        try {
            await sendRequest(`/places/${placeId}`, 'DELETE', null, { Authorization: `Bearer ${token}`})
            navigate(`/${userId}/places`)
            onDelete(placeId)
        } catch (error) {
            console.log(error)
        }
    }

    return (<Fragment>
            <Error error={error} onClear={clearError} />
            <Modal show={map} onCancel={closeMapHandle} header={address} 
                contentClass={'list-item__modal-content'} footerClass={'list-item__modal-footer'} 
                footer={<Button onClick={closeMapHandle}>CLOSE</Button>}>
                <div className='map-content'><Map center={location} zoom={15} /></div>
            </Modal>
            <Modal show={show} onCancel={cancelHandle} header={'Are you sure!?'} footerClass={'list-item__modal-footer'} 
                   footer={<Fragment>
                            <Button inverse onClick={cancelHandle}>CANCEL</Button>
                            <Button danger onClick={deleteConfirm}>DELETE</Button>
                        </Fragment>}>
                <p>Do you wish to proceed? </p>
            </Modal>
            <li className='list-item'>
                <Card className='list-content'>
                    { loading && (<Loading asOverlay />)}
                    <div className='list-image'>
                        <img src={`${process.env.REACT_APP_IMAGE}/${image}`} alt={title} />
                    </div>
                    <div className='list-info'>
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{details}</p>
                    </div>
                    <div className='list-actions'>
                        <Button inverse onClick={openMapHandle}>VIEW ON MAP</Button>
                        { userId === author && (<Button type={'link'} to={`/places/${placeId}`}>EDIT</Button>)}
                        { userId === author && (<Button danger onClick={deleteOption}>REMOVE</Button>)}
                    </div>
                </Card>
            </li>
         </Fragment>)
}
