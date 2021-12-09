import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import baseUrl from "../util/baseUrl";

export const Comments = ({ currentPost, renderComments }) => {

    const [comments, setComments] = useState([...currentPost.comments]);
    const [isLoadMore, setLoadMore] = useState(false);
    console.log(comments.length, isLoadMore);
    const handleComments = () => {
        setLoadMore(true)
    }

    useEffect(async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/post/comment/${currentPost._id}`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            })
            setComments(data.comments)
        } catch (err) {
            console.log(err)
        }
    }, [renderComments])

    const commentsLists = comments.length === 0 ? <p>No any Comments</p> :
        (comments.length < 3) || isLoadMore ? comments.map(comment => {
            return <div key={comment._id} className="flex px-4 py-3">
                <img src={comment.user.avatarUrl} className="h-10 w-10 rounded-full flex-shrink-0 bg-gray-300" />
                <div className="ml-2">
                    <div className="-mt-1">
                        <span className="text-sm font-semibold">{comment.user.username}</span>
                        <span className="ml-1 text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                </div>

            </div>
        }) : comments.slice(0, 3).map(comment => {
            return <div key={comment._id} className="flex px-4 py-3">
                <img src={comment.user.avatarUrl} className="h-10 w-10 rounded-full flex-shrink-0 bg-gray-300" />
                <div className="ml-2">
                    <div className="-mt-1">
                        <span className="text-sm font-semibold">{comment.user.username}</span>
                        <span className="ml-1 text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                </div>

            </div>
        })
    return <div className="flex flex-col flex-grow overflow-auto">
        {commentsLists}
        {(comments.length > 3) && <div className="flex flex-col items-center mt-2">
            <hr className="w-full" />
            <button onClick={handleComments} className="flex items-center justify-center -mt-3 bg-white h-6 px-3 rounded-full border text-xs font-semibold mx-auto">View More</button>
        </div>}
    </div>
}