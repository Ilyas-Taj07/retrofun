import React, { useEffect, useState } from "react";
import "./App.css"
import AddIcon from './assets/Icons/plus.png'
import RetroCard from "./Components/RetroCard";
import NewText from "./Components/NewText";
import { useLocation } from "react-router-dom";

const Dashboard: React.FC = () => {
    const location = useLocation()


    useEffect(() => {

        console.log(location.search.split('?')[1])

    }, [location])

    return (
        <div className='dashboard--container'>
            <div className='dardboard--title'>
                <span>Dashboard</span>
            </div>
            <FirstSection />
            <SecondSection />
            <ThirdSection />
        </div>
    )
}

export default Dashboard


function FirstSection() {

    const [isActive, setIsActive] = useState<boolean>(false)
    const [list, setList] = useState<string[]>([])

    const handleNewText = (value: string) => {
        setList(item => [...item, value])
        setIsActive(false)
    }

    const handleClose = () => {
        setIsActive(false)
    }

    const handleUpdateValues = (value: string, indexValue: number) => {

        setList(listItem => listItem.map((item, index) => index === indexValue ? value : item))

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
                                list.map((item, index) => {
                                    return <RetroCard
                                        text={item}
                                        key={index}
                                        index={index}
                                        handleUpdateValues={handleUpdateValues}
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
                        handleNewText={handleNewText}
                        handleClose={handleClose}
                    />
                )
            }
        </div>
    )
}


function SecondSection() {

    const [isActive, setIsActive] = useState<boolean>(false)
    const [list, setList] = useState<string[]>([])

    const handleNewText = (value: string) => {
        setList(item => [...item, value])
        setIsActive(false)
    }

    const handleClose = () => {
        setIsActive(false)
    }

    const handleUpdateValues = (value: string, indexValue: number) => {

        setList(listItem => listItem.map((item, index) => index === indexValue ? value : item))

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
                                list.map((item, index) => {
                                    return <RetroCard
                                        text={item}
                                        key={index}
                                        index={index}
                                        handleUpdateValues={handleUpdateValues}
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
                        handleNewText={handleNewText}
                        handleClose={handleClose}
                    />
                )
            }
        </div>
    )
}

function ThirdSection() {

    const [isActive, setIsActive] = useState<boolean>(false)
    const [list, setList] = useState<string[]>([])

    const handleNewText = (value: string) => {
        setList(item => [...item, value])
        setIsActive(false)
    }

    const handleClose = () => {
        setIsActive(false)
    }

    const handleUpdateValues = (value: string, indexValue: number) => {

        setList(listItem => listItem.map((item, index) => index === indexValue ? value : item))

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
                                list.map((item, index) => {
                                    return <RetroCard
                                        text={item}
                                        key={index}
                                        index={index}
                                        handleUpdateValues={handleUpdateValues}
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
                        handleNewText={handleNewText}
                        handleClose={handleClose}
                    />
                )
            }
        </div>
    )
}