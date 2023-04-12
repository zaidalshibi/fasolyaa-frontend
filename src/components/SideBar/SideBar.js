import React from "react";
import { Link } from "react-router-dom";
import fasolyaa from "../../assets/images/fasolyaa.png";
import { AiFillHome } from 'react-icons/ai';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { ReactComponent as BooksIcon } from '../../assets/svg/booksIcon.svg';
import { ReactComponent as Mic } from '../../assets/svg/mic.svg';
import { ReactComponent as Ques } from '../../assets/svg/ques.svg';
import { ReactComponent as Lib } from '../../assets/svg/lib.svg';
import { ReactComponent as Setting } from '../../assets/svg/setting.svg';
import { ReactComponent as Signout } from '../../assets/svg/signout.svg';
import './SideBar.css';

const SideBar = () => {
    const handleSignout = ( e ) => {
        e.preventDefault();
        localStorage.removeItem( 'token' );
        const signoutbutton = document.getElementById( 'signout' );
        signoutbutton.style.display = 'none';
    };

    return (
        <div className="sidebar">
            <span className="sidebarContainer">
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '10px',
                    margin: '10px',
                    marginTop: '0px',
                }}>
                    <img src={fasolyaa} alt="logo" />
                </div>
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0px 40px',
                    margin: '10px',
                }}>
                    <Link to="/" className="linkText">
                        <div className="iconContainer">
                            <AiFillHome className="icon" color="yellow" />
                        </div>
                        <span className="linkText">
                            الرئيسية
                        </span>
                    </Link>
                </div>
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0px 40px',
                    margin: '10px',
                }}>
                    <Link to="/songs" className="linkText">
                        <div className="iconContainer2">
                            <BsMusicNoteBeamed className="icon or" color="white" />
                        </div>
                        <span className="linkText">
                            أغاني
                        </span>
                    </Link>
                </div>
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0px 40px',
                    margin: '10px',
                }}>
                    <Link to="/" className="linkText">
                        <div className="iconContainer3">
                            <BooksIcon className="icon" />
                        </div>
                        <span className="linkText">
                            قصص
                        </span>
                    </Link>
                </div>
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0px 40px',
                    margin: '10px',
                }}>
                    <Link to="/" className="linkText">
                        <div className="iconContainer4">
                            <Mic className="icon" color="yellow" />
                        </div>
                        <span className="linkText">
                            الألعاب العائلية
                        </span>
                    </Link>
                </div>
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0px 40px',
                    margin: '10px',
                }}>
                    <Link to="/" className="linkText">
                        <div className="iconContainer5">
                            <Ques className="icon" color="yellow" />
                        </div>
                        <span className="linkText">
                            المدونات
                        </span>
                    </Link>
                </div>
            </span>
            <span className="sidebarContainer">
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0px 40px',
                    margin: '10px',
                }}>
                    <Link to="/" className="linkText">
                        <div className="iconContainer6">
                            <Lib className="icon" color="yellow" />
                        </div>
                        <span className="linkText">
                            مكتبتك
                        </span>
                    </Link>
                </div>
                <div className="linkContainer" style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0px 40px',
                    margin: '10px',
                }}>
                    <Link to="/" className="linkText">
                        <div className="iconContainer6">
                            <Setting className="icon" color="yellow" />
                        </div>
                        <span className="linkText">
                            الاعدادات
                        </span>
                    </Link>
                </div>
                <div
                    className="linkContainer"
                    id="signout"
                    style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                        padding: '0px 40px',
                        margin: '10px',
                    }}>
                    <button
                        className="linkText"
                        onClick={handleSignout}
                        style={{
                            border: 'none',
                            background: 'none',
                            outline: 'none',
                            cursor: 'pointer'
                        }}>
                        <div className="iconContainer6">
                            <Signout className="icon" color="yellow" />
                        </div>
                        <span className="linkText">
                            تسجيل الخروج
                        </span>
                    </button>
                </div>
            </span>
        </div>
    );
};

export default SideBar;