import React, { useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ReactComponent as Notification } from '../../assets/svg/notification.svg';
import avatar from '../../assets/svg/avatar.svg';
import './TopBar.css';
import { useNavigate } from 'react-router-dom';

function TopBar ( { search, disabled } ) {
    const navigate = useNavigate();
    const username = localStorage.getItem( 'username' );

    const gotoLogin = () => {
        if ( !username ) {
            navigate( '/login' );
        }
    };

    useEffect( () => {
        const signoutbutton = document.getElementById( 'signout' );
        const avatar = document.querySelector( '.user img' );
        if ( username ) {
            signoutbutton.style.display = 'block';
        } else {
            signoutbutton.style.display = 'none';
            avatar.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
        }
    }, [username?.length, username] );

    useEffect( () => {
        let username = localStorage.getItem( 'username' );
        const user = document.querySelector( '.user-name p' );
        const userDiv = document.querySelector( '.user' );
        if ( username ) {
            user.innerHTML = username.toUpperCase();
        } else {
            user.innerHTML = 'قم بتسجيل الدخول';
            userDiv.style.cursor = 'pointer';

        }
    }, [] );

    return (
        <>
            <div className="topBar">
                <SearchBar search={search} disabled={disabled} />
                <div className="notification">
                    <Notification />
                </div>
                <div className="user" onClick={gotoLogin}>
                    <img src={avatar} alt="user" />
                    <div className="user-name">
                        <p></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBar;;