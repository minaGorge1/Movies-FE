import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login({ saveUser }) //props.saveUser
{

    let [user, sitUser] = useState({
        email: "",
        password: ""
    })

    let [errorApi, setErrorApi] = useState("")
    let [errorLest, setErrorLest] = useState("")
    let [louding, setLouding] = useState(false)
    let navgiate = useNavigate()

    function addUser(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value // biro ll object [element = name ]
        sitUser(myUser)
    }

    async function submitForm(e) {
        e.preventDefault() // al slook al bda2y ll submit
        let valid = ValidData() // vaild

        if (valid.error == null) {
try {
    setLouding(true)
    let { data } = await axios.post('http://localhost:5000/auth/sign-in', user)
    setLouding(false)
    if (data.message === 'Done') {
        // login
        navgiate('/home') /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA1YTA5MjlhMmJiMDA2NzAzM2FhMGYiLCJmaXJzdF9uYW1lIjoiQWhtZWQiLCJsYXN0X25hbWUiOiJBYmQgQWwtTXV0aSIsImVtYWlsIjoiYWhtZWRtdXR0aUBnbWFpbC5jb20iLCJhZ2UiOjIzLCJpYXQiOjE2MTA5ODE2NjR9.En_GnIB7mk7HiaUuedf0c0PseYaaL6prBMF1vn1pyLI */
        localStorage.setItem('token', data.token) // bn7fz al token user in local storage

        saveUser() // call fun aly b decode al token
    } else {
        // error
        setErrorApi(data.message)
    }
} catch (error) {
    setErrorApi(error.response.data.message)
}
            setLouding(true)
                let { data } = await axios.post('http://localhost:5000/auth/sign-in', user)
                setLouding(false)
                if (data.message === 'Done') {
                    // login
                    navgiate('/home') /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA1YTA5MjlhMmJiMDA2NzAzM2FhMGYiLCJmaXJzdF9uYW1lIjoiQWhtZWQiLCJsYXN0X25hbWUiOiJBYmQgQWwtTXV0aSIsImVtYWlsIjoiYWhtZWRtdXR0aUBnbWFpbC5jb20iLCJhZ2UiOjIzLCJpYXQiOjE2MTA5ODE2NjR9.En_GnIB7mk7HiaUuedf0c0PseYaaL6prBMF1vn1pyLI */
                    localStorage.setItem('token', data.token) // bn7fz al token user in local storage

                    saveUser() // call fun aly b decode al token
                } else {
                    // error
                    setErrorApi(data.message)
                }
            

        } else {
            setErrorLest(valid.error.details)
        }
    }

    function ValidData() {

        let scheme = Joi.object({
            email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),//top level domin
            password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        })
        return scheme.validate(user, { abortEarly: false }) // dy al btkarin w btl3lk 2h aly na2s

    }

    return (
        <>
            <h2>login Form</h2>

            {/* {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key == "email" ? <div key={i} className=' alert alert-danger'>{el.message}</div> : "") : ""}
 */}
            <form onSubmit={submitForm} >
                <div className='mt-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='email' name='email' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "email" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>


                <div className='mt-3'>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='password' name='password' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "password" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
                {errorApi === "" ? "" : <div className='fs-4 text-danger m-2 alert-danger '>{errorApi}</div>}

                <div className='mt-3 d-flex justify-content-end'>
                    {louding ?
                        <button className='btn btn-outline-info'><i className='fa-solid fa-spinner fa-spin'></i></button>
                        : <button type='submit' className='btn btn-outline-info'>Login</button>}

                </div>

            </form>

            <Link to='../ForgetPass' ><a className='directory border border-info text-info border-top-0 border-start-0 border-end-0 border-bottom-5'>Forget Password</a> </Link>
        </>
    );
}

