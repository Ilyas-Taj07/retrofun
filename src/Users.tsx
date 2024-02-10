import React, { useEffect, useState } from 'react';
import LogoImage from './assets/retrofun-logo.png';
import { socket } from './App';

const Users: React.FC = () => {

    const [count, setCount] = useState<number>(0)

    useEffect(() => {

        socket.on('get_count', (data) => {
            setCount(data.count)
        })

    }, [socket])

    return <div className='users--container'>
        <div className='app--logo'>
            <img src={LogoImage} alt="logo" />
        </div>
        <div className='users--app'>
            <div className='users--btn'>
                <span>Users Joined</span>
                <div className='users--joined'>{count}</div>
            </div>
            <div className='users--btn'>
                <span>Export</span>
            </div>
        </div>
    </div>;
}

export default Users