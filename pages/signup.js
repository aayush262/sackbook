import React, { useState } from 'react';
import { AuthForm } from '../components/authForm';
import notify from './../util/notify';
import axios from 'axios';
import baseUrl from './../util/baseUrl';
import router from 'next/router';
import cookies from 'js-cookie';

const Signup = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        checkPassword: ""
    });

    const handleChage = e => {
        const { name, value } = e.target;
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleClick = async() => {
        const isUser = Object.values(user).every(user => user)
        if (!isUser) return notify.warn('Please fil up the form');
        if (user.password !== user.checkPassword) return notify.warn('Password did not match')
        try{
            const { data } = await axios.post(`${baseUrl}/api/signup`,{
                username: user.username,
                email: user.email,
                password: user.password
            })
            cookies.set('token',data.token)
            notify.success(data.msg)
            router.push('/')
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <AuthForm>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Username</span>
                    <input onChange={handleChage} name="username" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="Jane Doe" />
                </label>
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                    <input onChange={handleChage} name="email" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="janedoe@gmail.com" />
                </label>
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Password</span>
                    <input onChange={handleChage} name="password" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="***************" type="password" />
                </label>
                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Confirm Password</span>
                    <input onChange={handleChage} name="checkPassword" className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="***************" type="password" />
                </label>
                {/* You should use a button here, as the anchor is only used for the example  */}
                <div onClick={handleClick} className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" >
                    Create Account
                </div>
            </AuthForm>
        </>
    )
}

export default Signup;