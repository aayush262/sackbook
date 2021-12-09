import React, { useState , useRef } from "react";
import { Comments } from "./comments";
import axios from 'axios';
import baseUrl from "../util/baseUrl";
import Cookies from "js-cookie";

export const CreateComment = ({ user, postId, currentPostId, currentPost }) => {
    const [text, setText] = useState('');
    const [renderComments,setRenderComments]= useState(false)
    const inputRef = useRef();

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleClick = async (postId) => {
        try {
            await axios.post(`${baseUrl}/api/post/comment/${postId}`, {
                text
            }, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            })
            inputRef.current.value=""
            setRenderComments(true)
        } catch (err) {
            console.log(err)
        }
    }
   
    return (
        <>
            {currentPostId === postId && <><Comments
                user={user}
                currentPost={currentPost}
                renderComments={renderComments}
            />
                <div className=" bg-white p-2 pt-4 rounded">
                    <div className="flex ml-3">
                        <div className="mr-3">
                            <img className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" src={user.avatarUrl} alt={user._id} />
                        </div>
                        <input ref={inputRef} onChange={handleChange} rows={3} className="border p-2 rounded w-full" placeholder="Write something..." />
                        <div className="flex justify-between mx-3">
                            <div><button onClick={() => handleClick(postId)} className="px-4 py-1 mt-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700">Submit</button></div>
                        </div>
                    </div>
                </div>
                <hr className="mt-2"></hr></>}

        </>
    )
}