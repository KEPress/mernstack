import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Button } from '../button/Button'
import './Upload.scss'

export const Upload = ({ id, center, onInput, onError}) => {

    const fileSelect = useRef()

    const [file, setFile] = useState(null)

    const [preview, setPreview] = useState(null)

    const [check, setCheck] = useState(false)

    const selectHandle = () => {
        fileSelect.current.click()
    }

    useEffect(() => {
        if (!file) return
        const fileReader = new FileReader()
        fileReader.onload = () => setPreview(fileReader.result)
        fileReader.readAsDataURL(file)
    }, [file])

    const fileHandle = (event) => {
        let fileExtract, validity = check
        if (event.target.files && event.target.files.length === 1) {
            fileExtract = event.target.files[0]
            setFile(fileExtract)
            setCheck(true)
            validity = true
        } else {
            setCheck(false)
            validity = false
        } 
        onInput(id, fileExtract, validity)
    }

    return (<Fragment>
            <div className='form-control'>
                <input type={'file'} id={id} ref={fileSelect} style={{ display: 'none'}} accept={'.jpg, .png, .jpeg'} onChange={fileHandle} />
                <div className={`image-upload ${center && ('center')}`}>
                    <div className='image-preview'>
                      { preview && (<img src={preview} alt={'preview'} />)} 
                      {!preview && (<p>Please select an image</p>)}
                    </div>
                    <Button type={'button'} onClick={selectHandle}>Select Image</Button>
                </div>
                {!check && (<p>{onError}</p>)}
            </div>
        </Fragment>)

}
