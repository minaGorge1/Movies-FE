import axios from 'axios';
import Joi from 'joi';
import { error } from 'jquery';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ForgetPass = ({ setEmail }) => {


    let [user, sitUser] = useState({
        email: "",
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

            setLouding(true)
            try {
                let { data } = await axios.patch('http://localhost:5000/auth/sendcode', user)
                setLouding(false)
                if (data.message === 'Done please check your email') {
                    // login
                    navgiate('UpdataPass')
                    localStorage.setItem('tokenEmail', user.email) // bn7fz al token user in local storage
                } else {
                    // error
                    setErrorApi(data.message)
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
            email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),//top level domin
        })
        return scheme.validate(user, { abortEarly: false }) // dy al btkarin w btl3lk 2h aly na2s
    }


    return (
        <>
            <h2>Enter Your Email</h2>

            {/* {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key == "email" ? <div key={i} className=' alert alert-danger'>{el.message}</div> : "") : ""}
 */}
            <form onSubmit={submitForm} >
                <div className='mt-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={addUser} className='form-control mt-2 bg-transparent text-white' id='email' name='email' />
                    {errorLest.length > 0 ? errorLest.map((el, i) => el.context.key === "email" ? <div key={i} className=' text-danger m-2 alert-danger'>{el.message}</div> : "") : ""}
                </div>
                {errorApi === "" ? "" : <div className='fs-4 text-danger m-2 alert-danger '>{errorApi}</div>}
                <div className='mt-3 d-flex justify-content-end'>
                    {louding ?
                        <button className='btn btn-outline-info'><i className='fa-solid fa-spinner fa-spin'></i></button>
                        : <button type='submit' className='btn btn-outline-info'>send code</button>}

                </div>

            </form>
        </>
    );
}

export default ForgetPass;
