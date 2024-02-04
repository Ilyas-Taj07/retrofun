import React from 'react';
import LogoImage from './assets/retrofun-logo.png';

const Users: React.FC = () => {
    return <div className='users--container'>
        <div className='app--logo'>
            <img src={LogoImage} alt="logo" />
        </div>
        <div className='users--app'>
            <div className='users--btn'>
                <span>Users Joined</span>
                <div className='users--joined'>01</div>
            </div>
            <div className='users--btn'>
                <span>Export</span>
            </div>
        </div>
    </div>;
}

export default Users