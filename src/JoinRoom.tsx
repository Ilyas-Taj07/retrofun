import React, { useState } from "react";
import LogoImage from './assets/retrofun-logo.png'
import "./joinRoom.css";
import { useNavigate } from "react-router-dom";

const JoinRoom: React.FC = () => {

    const navigate = useNavigate()

    const [room, setRoom] = useState("")

    const handleNavigate = () => {
        navigate(`/home?${room}`)
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
                    <button onClick={handleNavigate}>Join Room</button>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom;