import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import base64 from 'base-64';
import './auth.css'

function Login () {
    let history = useNavigate();
    const [ loading, setLoading ] = useState( false );
    const handleLogin = ( e ) => {
        e.preventDefault();
        setLoading( true );
        const username = e.target.username.value;
        const password = e.target.password.value;
        const basicToken = base64.encode( `${username}:${password}` );
        axios.defaults.headers.common[ 'Authorization' ] = `Basic ${basicToken}`;
        axios.post( `http://localhost:3001/users/login`, {
            username,
            password
        } )
            .then( res => {
                Swal.fire( {
                    icon: 'success',
                    title: 'تم تسجيل الدخول بنجاح',
                    text: 'سيتم تحويلك إلى الصفحة الرئيسية',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                } );
                localStorage.setItem( 'token', res.data.token );
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('username', res.data.username);
                setTimeout( () => {
                    setLoading( false );
                    history( '/' );
                }, 3000 );
            } )
            .catch( err => {
                console.log( err );
                setLoading( false );
            } );
    };
    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <h2>مرحبا بك !</h2>
                <fieldset>
                    <legend>تسجيل الدخول</legend>
                    <ul>
                        <li>
                            <label htmlFor="username">اسم المستخدم:</label>
                            <input type="text" id="username" required />
                        </li>
                        <li>
                            <label htmlFor="password">رمز المرور:</label>
                            <input type="password" id="password" required />
                        </li>
                    </ul>
                </fieldset>
                <button type='Submit' disabled={loading}>تسجيل الدخول</button>
                <Link to="/signup">
                    <button type="button">قم بإنشاء حساب</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;