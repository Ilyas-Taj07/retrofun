import React, { useState } from "react";
import LogoImage from './assets/retrofun-logo.png'
import "./joinRoom.css";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { socket } from './App'

const JoinRoom: React.FC = () => {

    const navigate = useNavigate()

    const [room, setRoom] = useState("")

    const [existingRoom, setExistingRoom] = useState("")

    const handleCreateRoom = () => {

        const dt = new Date()

        let expiry = `${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`

        let SECURE_STRING = CryptoJS.AES.encrypt(JSON.stringify({
            roomId: room,
            exp: expiry
        }).toString(), "ILYASHUSSAIN")

        let values = SECURE_STRING.toString().split('/').join('|')

        socket.emit('join_room', {
            roomId: values
        })

        navigate(`/home?${values}`)
    }

    const handleJoinRoom = () => {

        if (existingRoom === "") {
            alert('Please provide the room Id')
            return false
        }

        let value = CryptoJS.AES.decrypt(existingRoom.toString().split('|').join('/'), "ILYASHUSSAIN")
        let parsedData = JSON.parse(value.toString(CryptoJS.enc.Utf8))

        const currentdt = new Date() // current
        const dt = new Date(parsedData.exp) // previous

        if (`${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}` === `${currentdt.getMonth() + 1}-${currentdt.getDate()}-${currentdt.getFullYear()}`) {
            socket.emit('join_room', {
                roomId: existingRoom
            })
            navigate(`/home?${existingRoom}`)
        }
        else {
            alert('Room has been expired')
        }
    }

    return (
        <div className="join-room--container">
            <div className="join-room--card">
                <div className="join-room-image-container">
                    <img src={LogoImage} alt="logo" />
                </div>
                <div className="join-room-text-field">
                    <input
                        type="text"
                        placeholder="Enter the Room name"
                        value={room}
                        onChange={(e) => {
                            if (e.target.value.length < 10) {
                                setRoom(e.target.value)
                            }
                        }}
                    />
                    <button onClick={handleCreateRoom}>Create Room</button>
                </div>
                <p style={{ textAlign: 'center' }}>OR</p>
                <div className="join-room-text-field">
                    <input
                        type="text"
                        placeholder="Enter the Room Id"
                        value={existingRoom}
                        onChange={(e) => {
                            setExistingRoom(e.target.value)
                        }}
                    />
                    <button onClick={handleJoinRoom}>Join Room</button>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom;