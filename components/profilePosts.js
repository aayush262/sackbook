import React,{useContext} from 'react'
import { Posts } from './../pages/[username]';

export const ProfilePosts = () => {
    const posts = useContext(Posts)
    const postList = posts.length !== 0 ?
        posts.map(post => {
            return (
                <div key={post._id} className="flex flex-col flex-grow border-l border-r border-gray-300">
                    <div className="flex w-full p-8 border-b border-gray-300 border-t-[1px]">
                        <img src={post.user.avatarUrl} className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
                        <div className="flex flex-col flex-grow ml-4">
                            <div className="flex">
                                <span className="font-semibold">{post.user.username}</span>
                                <span className="ml-1">@{post.user.username}</span>
                                <span className="ml-auto text-sm">Just now</span>
                            </div>
                            <p className="mt-1">{post.text}<a className="underline" href="#">#hashtag</a></p>
                            {post.picUrl && <div className="flex items-center justify-center h-64 mt-2 bg-gray-200">
                                <img src={post.picUrl} className="object-cover h-64 w-auto"/>
                            </div>}
                            <div className="flex mt-2">
                                <button className="text-sm font-semibold">Like</button>
                                <button className="ml-2 text-sm font-semibold">Reply</button>
                                <button className="ml-2 text-sm font-semibold">Share</button>
                                <button className="ml-auto text-sm font-semibold text-indigo-500 hover:underline">{post.likes.length} likes</button>
                                <button className="ml-2 text-sm font-semibold text-indigo-500 hover:underline">{post.comments.length} comments</button>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }) : <>No any posts</>
    return (
        <>{postList}</>
    )
}