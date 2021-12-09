import React, { useState } from "react";
import { AuthForm } from "../components/authForm";
import axios from "axios";
import notify from "./../util/notify";
import baseUrl from "../util/baseUrl";
import router from 'next/router';
import cookies from 'js-cookie';

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleClick = async() => {
        const isFilled = Object.values(user).every(item=>item)
        if(!isFilled) return notify.warn('Please fill up the form')
        try{
            const { data } = await axios.post(`${baseUrl}/api/auth`,user);
            cookies.set('token',data.token)
            notify.success(data.msg)
            router.push('/')
        }catch(err){
            console.log(err)
        }
    }

    return <>
        <AuthForm>
            <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Email</span>
                <input onChange={handleChange} name="email" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="jandoe@gmail.com" />
            </label>
            <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">Password</span>
                <input onChange={handleChange} name="password" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="***************" type="password" />
            </label>
            {/* You should use a button here, as the anchor is only used for the example  */}
            <a onClick={handleClick} className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Log in
            </a>
        </AuthForm>
    </>
}

export default Login;