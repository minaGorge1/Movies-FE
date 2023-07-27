import axios from 'axios';
import Joi from 'joi';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdataPass() {
    let [user, sitUser] = useState({
        email: ``,
        code: "",
        password: "",
        cPassword: "",
    })

    useEffect(() => {
        user.email = token
    }, [])

    let [errorApi, setErrorApi] = useState("")
    let [errorLest, setErrorLest] = useState("")
    let [louding, setLouding] = useState(false)
    let navgiate = useNavigate()
    let token = localStorage.getItem('tokenEmail')
    /* let data = jwt_decode(token) */



    function addUser(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value // biro ll object [element = name ]
        sitUser(myUser)
    }

    async function submitForm(e) {
        e.preventDefault() // al slook al bda2y ll submit
        let valid = ValidData() // vaild

        if (valid.error == null) {

            setLouding(true)
            let { data } = await axios.patch('http://localhost:5000/auth/forGotPassword/', user)
            console.log(data);
            setLouding(false)
            if (data.message === 'Done') {
                // login
                navgiate('../../login') /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA1YTA5MjlhMmJiMDA2NzAzM2FhMGYiLCJmaXJzdF9uYW1lIjoiQWhtZWQiLCJsYXN0X25hbWUiOiJBYmQgQWwtTXV0aSIsImVtYWlsIjoiYWhtZWRtdXR0aUBnbWFpbC5jb20iLCJhZ2UiOjIzLCJpYXQiOjE2MTA5ODE2NjR9.En_GnIB7mk7HiaUuedf0c0PseYaaL6prBMF1vn1pyLI */
                localStorage.removeItem('tokenEmail') // bn7fz al token user in local storage

                // saveUser() // call fun aly b decode al token
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
            cPassword: Joi.string().required().valid(Joi.ref('password')).required(),
            code: Joi.string().pattern(new RegExp(/^\d{4}$/)).required()
        })
        return scheme.validate(user, { abortEarly: false }) // dy al btkarin w btl3lk 2h aly na2s
    }

    return (
        <>
            <h2>Enter Code</h2>

            {/* {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key == "email" ? <div key={i} className=' alert alert-danger'>{el.message}</div> : "") : ""}
*/}
            <form onSubmit={submitForm} >
                <div className='mt-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='email' name='email' value={token} />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "email" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
                <div className='mt-3'>

                    <label htmlFor="code">Code</label>
                    <input type="text" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='code' name='code' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "code" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
                <div className='mt-3'>
                    <label htmlFor="password">password</label>
                    <input type="password" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='password' name='password' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "password" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
                <div className='mt-3'>
                    <label htmlFor="cPassword">cPassword</label>
                    <input type="password" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='cPassword' name='cPassword' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "cPassword" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
                {errorApi === "" ? "" : <div className='fs-4 text-danger m-2 alert-danger '>{errorApi}</div>}
                <div className='mt-3 d-flex justify-content-end'>
                    {louding ?
                        <button className='btn btn-outline-info'><i className='fa-solid fa-spinner fa-spin'></i></button>
                        : <button type='submit' className='btn btn-outline-info'>send code</button>}

                </div>

            </form>
        </>
    )
}
