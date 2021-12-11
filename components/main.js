import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../util/baseUrl'
import cookies from 'js-cookie';
import { PostHeader } from './../components/postHeader';
import { CreatePost } from './../components/createPost';
import { Posts } from './../components/posts';
import { SideBar } from './sideBar';

export const Main = ({ user, postsData }) => {

    const [posts, setPosts] = useState(postsData || [])
    const [isSearchDropDown, setSearchDropDown] = useState(false);
    const [users, setUsers] = useState([])

    const handleChange = async (e) => {
        const searchQuery = e.target.value
        if (searchQuery) {
            setSearchDropDown(true)
            try {
                const { data } = await axios.get(`${baseUrl}/api/search/${searchQuery}`, {
                    headers: {
                        Authorization: cookies.get('token')
                    }
                })
                setUsers(data.users);
            } catch (err) {
                setUsers([])
                console.log(err);
            }
        } else {
            setSearchDropDown(false)
        }
    }

    const search = isSearchDropDown && <> {users.length === 0 ? <>
        <li id="listbox-item-0" role="option" className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9">
            <div className="flex items-center">
                No such user found
            </div>
        </li></> : users.map(user => {
            return <li id="listbox-item-0" role="option" className="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9">
                <div className="flex items-center">
                    <img src={user.avatarUrl} alt="person" className="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span className="ml-3 block font-normal truncate">
                        {user.username}
                    </span>
                </div>
            </li>
        })}</>

    return (
        <>
            <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
                <div className="flex w-full max-w-screen-lg">
                   <SideBar user={user} />
                    <div className="flex flex-col flex-grow border-l border-r border-gray-300">
                        <PostHeader />
                        <div className="flex-grow h-0 overflow-auto">
                            <CreatePost
                                user={user}
                                setPosts={setPosts} />
                            <Posts
                                user={user}
                                posts={posts}
                                setPosts={setPosts} />
                        </div>
                    </div>
                    <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
                        <div className="rounded shadow-md my-2 relative pin-t pin-l">
                            <ul className="list-reset">
                                <li className="p-2"><input onChange={handleChange} className="border-2 rounded h-8 w-full" placeholder="search..." /><br /></li>
                                {search}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mt-6 font-semibold">Trending</h3>
                            <div className="flex w-full py-4 border-b border-gray-300">
                                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                                <div className="flex flex-col flex-grow ml-2">
                                    <div className="flex text-sm">
                                        <span className="font-semibold">Username</span>
                                        <span className="ml-1">@username</span>
                                    </div>
                                    <p className="mt-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
                                </div>
                            </div>
                            <div className="flex w-full py-4 border-b border-gray-300">
                                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                                <div className="flex flex-col flex-grow ml-2">
                                    <div className="flex text-sm">
                                        <span className="font-semibold">Username</span>
                                        <span className="ml-1">@username</span>
                                    </div>
                                    <p className="mt-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
                                </div>
                            </div>
                            <div className="flex w-full py-4 border-b border-gray-300">
                                <span className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                                <div className="flex flex-col flex-grow ml-2">
                                    <div className="flex text-sm">
                                        <span className="font-semibold">Username</span>
                                        <span className="ml-1">@username</span>
                                    </div>
                                    <p className="mt-1 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. <a className="underline" href="#">#hashtag</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}