import React, { useState } from 'react'
import "./NewText.css"
import { socket } from '../../App'
import { useLocation } from 'react-router-dom'

interface newText {
    handleClose: () => void,
    type: string,
    setTextField: React.Dispatch<React.SetStateAction<boolean>>
}


const NewText: React.FC<newText> = ({
    handleClose,
    type,
    setTextField
}) => {

    const [text, setText] = useState("")
    const [isActive, setIsActive] = useState(false)

    const location = useLocation()

    const handleAddText = () => {
        if (text === '') {
            setIsActive(true)
        }
        else {
            setIsActive(false)
            // emit the event
            socket.emit('send_message', {
                type: type,
                message: text,
                roomId: location.search.split('?')[1]
            })
            setTextField(false)
        }
    }

    return (
        <div className='new-text--container'>
            <div className='new-text--card'>
                <div className='new-text--field-container'>
                    <textarea
                        className={isActive ? 'text-area-field' : "a"}
                        value={text}
                        onChange={(e) => {
                            setIsActive(false)
                            if (e.target.value.length < 100) {
                                setText(e.target.value)
                            }
                        }} placeholder={isActive ? 'Please add text' : 'Add here...'} />
                </div>
                <div className='new-text--actions'>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleAddText}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default NewText