import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ReactComponent as Notification } from '../../assets/svg/notification.svg';
import avatar from '../../assets/svg/avatar.svg';
import './TopBar.css';

function TopBar ({ search, disabled}) {
    return (
        <>
            <div className="topBar">
                <SearchBar search={search} disabled={disabled}/>
                <div className="notification">
                    <Notification />
                </div>
                <div className="user">
                    <img src={avatar} alt="user" />
                    <div className="user-name">
                        <p> سارة حداد </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBar;;