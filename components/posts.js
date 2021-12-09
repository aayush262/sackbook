import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseUrl from '../util/baseUrl';
import Cookies from 'js-cookie';
import notify from './../util/notify';
import { CreateComment } from './../components/createComment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export const Posts = ({ posts, user, setPosts }) => {

    const [likes, setLikes] = useState([]);
    const [postId, setPostId] = useState('');

    const handleComments = (post) => {
        setPostId(post._id);
    }
    const handleLike = async (postId, postLikes) => {
        setLikes(postLikes);
        try {
            const { data } = await axios.post(`${baseUrl}/api/post/like/${postId}`, {}, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });
            notify.success(data.msg);
            setLikes(prev => [...prev, { user: user._id }])
        } catch (err) {
            console.log(err)
        }
    }
    const handleUnlike = async (postId, postLikes) => {
        setLikes(postLikes);
        try {
            const { data } = await axios.post(`${baseUrl}/api/post/unlike/${postId}`, {}, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });
            notify.success(data.msg);
            setLikes(prev => {
                const prevLikes = [...prev];
                const index = prevLikes.map(like => like.user.toString()).indexOf(user._id)
                prevLikes.splice(index, 1);
                return prevLikes
            })
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/post/?pageNumber=1`, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            })
            setPosts(data.posts)
        } catch (err) {
            console.log(err)
        }
    }, [likes])

    const postList = posts.length === 0 ? <h1>No Any Posts</h1> :
        posts.map(post => {
            return <div key={post._id}><div className="flex w-full p-8 border-b border-gray-300">
                <img src={post.user.avatarUrl} className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
                <div className="flex flex-col flex-grow ml-4">
                    <div className="flex">
                        <span className="font-semibold">{post.user.username}</span>
                        <span className="ml-1">@{post.user.username}</span>
                        <span className="ml-auto text-sm">Just now</span>
                    </div>
                    <p className="mt-1">{post.text}<a className="underline" href="#">#hashtag</a></p>
                    {post.picUrl && <div className="flex items-center justify-center h-64 mt-2 bg-gray-200">
                        <span className="font-semibold text-gray-500"><img src={post.picUrl} className="object-cover h-64 w-auto" ></img></span>
                    </div>}
                    <div className="flex mt-2">
                        {post.likes.filter(like => like.user._id.toString() === user._id.toString()).length === 0 ?
                            <button onClick={() => { handleLike(post._id, post.likes) }} className="text-sm font-semibold">Like</button>
                            : <button onClick={() => { handleUnlike(post._id, post.likes) }} className="text-sm font-semibold">Unlike</button>}
                        <button className="ml-2 text-sm font-semibold">Reply</button>
                        <button className="ml-2 text-sm font-semibold">Share</button>
                        <Popup
                            trigger={<button className="ml-auto text-sm font-semibold text-indigo-500 hover:underline">{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</button>}
                        >
                            <div style={{ fontFamily: `'Bangers', 'cursive'` }}>
                                <ul>
                                    {post.likes.map(like => {
                                        return <li key={like.user._id}>
                                            <a href="#" className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <img src={like.user.avatarUrl} alt="avatar" className="flex-shrink-0 object-cover mx-1 rounded-full w-6 h-6" />
                                                <div className="mx-1">
                                                    <h1 className="text-sm text-gray-700 dark:text-gray-200">{like.user.username}
                                                    </h1>
                                                </div>
                                            </a>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </Popup>
                        <button onClick={() => {
                            handleComments(post)
                        }} className="ml-2 text-sm font-semibold text-indigo-500 hover:underline">{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</button>
                    </div>
                </div>
            </div>
                <CreateComment
                    user={user}
                    postId={postId}
                    currentPostId={post._id}
                    currentPost={post}
                    posts={posts}
                    setPosts={setPosts} />
            </div>
        })
    return (
        <>{postList}</>
    )
}