import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Regsiter() {

    let [user, sitUser] = useState({
        userName: "",
        age: "",
        email: "",
        password: "",
        cPassword: ""
    })

    let [errorApi, setErrorApi] = useState("")
    let [errorLest, setErrorLest] = useState("")
    let [louding, setLouding] = useState(false)
    let navgiate = useNavigate()

    function addUser(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        sitUser(myUser)
    }

    async function submitForm(e) {
        e.preventDefault() // al slook al bda2y ll submit
        let valid = ValidData() // vaild

        if (valid.error == null) {
            try {
                setLouding(true)
                let { data } = await axios.post('http://localhost:5000/auth/sign-up', user)
                console.log(data.message);
                setLouding(false)
                if (data.message === 'Done') {
                    // login
                    navgiate('/login')
                } else {
                    // error
                    setErrorApi(data.Error)
                }
            } catch (error) {
                setErrorApi(error.response.data.message)
            }

        } else {
            setErrorLest(valid.error.details)
        }
    }

    function ValidData() {

        let scheme = Joi.object({
            userName: Joi.string().required().min(3).max(30).alphanum(),
            age: Joi.number().required().min(16).max(80),
            email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),//top level domin
            password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
            cPassword: Joi.string().required().valid(Joi.ref('password'))
        })
        return scheme.validate(user, { abortEarly: false }) // dy al btkarin w btl3lk 2h aly na2s

    }

    return (
        <>
            <h2>Regisertion Form</h2>

            {/*  {errorLest.length > 0 ? errorLest.map((el, i) => <div key={i} className=' alert alert-danger'>{el.message}</div>) : ""}
 */}
            {/* {errorApi == "" ? "" : <div className=' alert alert-danger'>{errorApi}</div>} */}


            <form onSubmit={submitForm} >
                <div className='mt-3'>
                    <label htmlFor="userName">User Name</label>
                    <input type="text" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='userName' name='userName' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "userName" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}

                </div>
                <div className='mt-3'>
                    <label htmlFor="age">Age</label>
                    <input type="number" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='age' name='age' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "age" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
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
                <div className='mt-3'>
                    <label htmlFor="cPassword">retie Password</label>
                    <input type="password" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='cPassword' name='cPassword' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "cPassword" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
                {errorApi === "" ? "" : <div className='fs-4 text-danger m-2 alert-danger '>{errorApi}</div>}
                <div className='mt-3 d-flex justify-content-end'>
                    {louding ?
                        <button className='btn btn-outline-info'><i className='fa-solid fa-spinner fa-spin'></i></button>
                        : <button type='submit' className='btn btn-outline-info'>Register</button>}

                </div>
            </form>
        </>
    );
}