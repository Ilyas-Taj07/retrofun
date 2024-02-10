import React, { useEffect, useState } from "react";
import "../../App.css"
import EditIcon from '../../assets/Icons/pen.png'
import DeleteIcon from '../../assets/Icons/bin.png'
import { socket } from "../../App";
import { useLocation } from "react-router-dom";

interface retroCardProps {
    text: string,
    index: number,
    Id: number
}

const RetroCard: React.FC<retroCardProps> = (props) => {

    const [isActive, setIsActive] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [text, setText] = useState("")

    const location = useLocation()

    useEffect(() => {
        setText(props.text)
    }, [props.text])


    const handleUpdate = () => {

        if (text === '') {
            alert('Please provide the message')
            return false
        }

        socket.emit('update_message', {
            roomId: location.search.split('?')[1],
            newMessage: text,
            Id: props.Id
        })
        setIsEdit(false)
    }

    const handleDelete = () => {

        socket.emit('delete_message', {
            roomId: location.search.split('?')[1],
            Id: props.Id
        })

    }

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
                            <img src={DeleteIcon} alt="delete-icon" onClick={handleDelete} />
                            {
                                isEdit ?
                                    <button onClick={handleUpdate}>Save</button>
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