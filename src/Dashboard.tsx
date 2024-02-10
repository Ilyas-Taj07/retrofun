import React, { useEffect, useState } from "react";
import "./App.css"
import AddIcon from './assets/Icons/plus.png'
import RetroCard from "./Components/RetroCard";
import NewText from "./Components/NewText";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { socket } from './App'


const Dashboard: React.FC = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [roomName, setRoomName] = useState('')

    const [list, setList] = useState<Messages[]>([])

    useEffect(() => {

        if (!!(location.search.split('?')[1])) {

            let value = CryptoJS.AES.decrypt(location.search.split('?')[1].toString().split('|').join('/'), "ILYASHUSSAIN")
            let parsedData = JSON.parse(value.toString(CryptoJS.enc.Utf8))

            const currentdt = new Date() // current
            const dt = new Date(parsedData.exp) // previous

            if (`${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}` === `${currentdt.getMonth() + 1}-${currentdt.getDate()}-${currentdt.getFullYear()}`) {
                setRoomName(parsedData.roomId)
                socket.emit('join_room', {
                    roomId: location.search.split('?')[1]
                })
            }
            else {
                navigate('/')
            }

            // check if the room is there or not
            // if not there navigate the user to the home page....
            // if there join him in that group
        }
        else {
            navigate('/')
        }

    }, [location])


    useEffect(() => {

        socket.on('get_messages', (data) => {
            setList(data)
        })

    }, [socket])

    return (
        <div className='dashboard--container'>
            <div className='dardboard--title'>
                <span>Dashboard <label style={{ fontSize: "18px", letterSpacing: 1 }}>( {roomName} )</label></span>
            </div>
            <FirstSection list={list} />
            <SecondSection list={list} />
            <ThirdSection list={list} />
        </div>
    )
}

export default Dashboard


const FirstSection: React.FC<List> = ({ list }) => {

    const [isActive, setIsActive] = useState<boolean>(false)

    const handleClose = () => {
        setIsActive(false)
    }

    return (
        <div className='retro--container'>
            <div className='retro--title'>
                <span>What Went Well</span>
                <div className='retro--img--container' onClick={() => setIsActive(true)}>
                    <img src={AddIcon} alt="add-icon" />
                </div>
            </div>
            <div className='retro--content'>
                {
                    list.length !== 0 && (
                        <>
                            {
                                list.filter(item => item.type === 'want-went-well').map((item, index) => {
                                    return <RetroCard
                                        text={item.message}
                                        key={index}
                                        index={index}
                                        Id={item.Id}
                                    />
                                })
                            }
                        </>
                    )
                }
            </div>
            {
                isActive && (
                    <NewText
                        handleClose={handleClose}
                        type="want-went-well"
                        setTextField={setIsActive}
                    />
                )
            }
        </div>
    )
}


const SecondSection: React.FC<List> = ({ list }) => {

    const [isActive, setIsActive] = useState<boolean>(false)

    const handleClose = () => {
        setIsActive(false)
    }

    return (
        <div className='retro--container'>
            <div className='retro--title'>
                <span>What to be improved</span>
                <div className='retro--img--container' onClick={() => setIsActive(true)}>
                    <img src={AddIcon} alt="add-icon" />
                </div>
            </div>
            <div className='retro--content'>
                {
                    list.length !== 0 && (
                        <>
                            {
                                list.filter(item => item.type === 'what-to-be-improved').map((item, index) => {
                                    return <RetroCard
                                        text={item.message}
                                        key={index}
                                        index={index}
                                        Id={item.Id}
                                    />
                                })
                            }
                        </>
                    )
                }
            </div>
            {
                isActive && (
                    <NewText
                        handleClose={handleClose}
                        type="what-to-be-improved"
                        setTextField={setIsActive}
                    />
                )
            }
        </div>
    )
}

const ThirdSection: React.FC<List> = ({ list }) => {

    const [isActive, setIsActive] = useState<boolean>(false)
    // const [list, setList] = useState<string[]>([])

    const handleClose = () => {
        setIsActive(false)
    }

    return (
        <div className='retro--container'>
            <div className='retro--title'>
                <span>Action Items | Suggestions</span>
                <div className='retro--img--container' onClick={() => setIsActive(true)}>
                    <img src={AddIcon} alt="add-icon" />
                </div>
            </div>
            <div className='retro--content'>
                {
                    list.length !== 0 && (
                        <>
                            {
                                list.filter(item => item.type === 'action-items').map((item, index) => {
                                    return <RetroCard
                                        text={item.message}
                                        key={index}
                                        index={index}
                                        Id={item.Id}
                                    />
                                })
                            }
                        </>
                    )
                }
            </div>
            {
                isActive && (
                    <NewText
                        handleClose={handleClose}
                        type='action-items'
                        setTextField={setIsActive}
                    />
                )
            }
        </div>
    )
}


interface Messages {
    Id: number,
    message: string,
    type: string,
    room: string
}


interface List {
    list: Messages[]
}