import React, { Fragment } from 'react'
import { Modal } from '../modal/Modal'
import { Button } from '../button/Button'

export const Error = (props) => {

    return (<Fragment>
                <Modal onCancel={props.onClear} 
                        header='Error' 
                        show={!!props.error} 
                        footer={<Button onClick={props.onClear}>Okay</Button>}>
                    <p>{props.error}</p>
                </Modal>
           </Fragment>)

}

