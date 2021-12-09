import React, { Children } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

export const AuthForm = ({ children }) => {

    const router = useRouter()
    const isSignUp = router.pathname === '/signup'

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    {isSignUp || <div className="h-32 md:h-auto md:w-1/2">
                        <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src="https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png" alt="Office" />
                        <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src="../assets/img/login-office-dark.jpeg" alt="Office" />
                    </div>}
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </h1>
                            {children}
                            <hr className="my-8" />
                            <button className="mb-4 flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white bg-purple-600 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                                <svg className="w-4 h-4 mr-2" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                                Login with facebook
                            </button>

                            {isSignUp || <p className="mt-4">
                                <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="./forgot-password.html">
                                    Forgot your password?
                                </a>
                            </p>}
                            <div className="mt-1 ">
                                <div className="text-sm font-medium text-purple-600 hover:underline">
                                    {isSignUp ? <Link href="/login">
                                        Already have an account? Login
                                    </Link> : <Link href="/signup">
                                        Create account
                                    </Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {isSignUp && <div className="h-32 md:h-auto md:w-1/2">
                        <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src="https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png" alt="Office" />
                        <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src="../assets/img/login-office-dark.jpeg" alt="Office" />
                    </div>}
                </div>
            </div>
        </div>
    )
}