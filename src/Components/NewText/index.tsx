import React, { useState } from 'react'
import "./NewText.css"

interface newText {
    handleClose: () => void,
    handleNewText: (value: string) => void,
}


const NewText: React.FC<newText> = ({
    handleClose,
    handleNewText
}) => {

    const [text, setText] = useState("")

    return (
        <div className='new-text--container'>
            <div className='new-text--card'>
                <div className='new-text--field-container'>
                    <textarea
                        value={text}
                        onChange={(e) => {
                            if (e.target.value.length < 100) {
                                setText(e.target.value)
                            }
                        }} placeholder='Add here...' />
                </div>
                <div className='new-text--actions'>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={() => handleNewText(text)}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default NewText