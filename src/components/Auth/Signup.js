import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from "axios";
import Swal from "sweetalert2";

function Signup () {
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    let history = useNavigate();
    const handleSignup = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = value;
        const gender = e.target.gender.value;
        const dob = e.target.date_of_birth.value;
        const password = e.target.password.value;
        const user = {
            username,
            name,
            email,
            phone,
            gender,
            dob,
            password
        };
        axios.post(`http://localhost:3001/users/signup`, user)
            .then(res => {
                Swal.fire( {
                    icon: 'success',
                    title: 'تم التسجيل بنجاح',
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
            })
            .catch(err => {
                console.log(err);
            })
    };
    return (
        <div className="signup">
            <form onSubmit={handleSignup}>
                <h2>قم بإنشاء حساب جديد</h2>
                <fieldset>
                    <legend>تسجيل معلوماتك</legend>
                    <ul>
                        <li>
                            <label htmlFor="username">اسم المستخدم</label>
                            <input type="text" id="username" />
                        </li>
                        <li>
                            <label htmlFor="name">الاسم الكامل</label>
                            <input type="text" id="name" required />
                        </li>
                        <li>
                            <label htmlFor="email">البريد الالكتروني</label>
                            <input type="email" id="email" required />
                        </li>
                        <li>
                            <label htmlFor="phone">رقم الهاتف</label>
                            <PhoneInput
                                value={value}
                                onChange={setValue} />
                        </li>
                        <li>
                            <label htmlFor="gender">الجنس</label>
                            <select name="gender" id="gender">
                                <option value='male'>ذكر</option>
                                <option value='female'>انثى</option>
                                <option value='other'>غير ذلك</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="date_of_birth">تاريخ الميلاد</label>
                            <input type="date" id="date_of_birth" required />
                        </li>
                        <li>
                            <label htmlFor="password">رمز المرور</label>
                            <input type="password" id="password" required />
                        </li>
                    </ul>
                </fieldset>
                <button type="Submit" disabled={loading}>سجل الآن !</button>
                <Link to="/login">
                    <button type="button" >لديك حساب ؟</button>
                </Link>
            </form>
        </div>
    );
}

export default Signup;