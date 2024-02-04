import React, { useEffect, useState } from "react";
import "../../App.css"
import EditIcon from '../../assets/Icons/pen.png'
import DeleteIcon from '../../assets/Icons/bin.png'

interface retroCardProps {
    text: string,
    index: number,
    handleUpdateValues: (value: string, index: number) => void;
}


const RetroCard: React.FC<retroCardProps> = (props) => {

    const [isActive, setIsActive] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [text, setText] = useState("")

    useEffect(() => {
        setText(props.text)
    }, [props.text])

    return (
        <div className='retro--card' onMouseOver={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            key={props.index}
        >
            <div className='retro--card--text'>
                {
                    !isEdit ?
                        <p>{text}</p>
                        :
                        <textarea
                            value={text}
                            onChange={(e) => {
                                if (e.target.value.length < 100) {
                                    setText(e.target.value)
                                }
                            }}
                        ></textarea>
                }
            </div>
            <div className='retro--card--options'>
                {
                    isActive && (
                        <>
                            <img src={DeleteIcon} alt="delete-icon" />
                            {
                                isEdit ?
                                    <button onClick={() => {
                                        props.handleUpdateValues(text, props.index)
                                        setIsEdit(false)
                                    }}>Save</button>
                                    :
                                    <img src={EditIcon} alt="edit-icon" onClick={() => {
                                        setIsEdit(true)
                                    }} />
                            }
                        </>
                    )
                }

            </div>
        </div >
    )
}

export default RetroCard