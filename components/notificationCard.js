import React from 'react';

export const NotificationCard = ({ avatar, username, type }) => {
    let text = 'liked your post';
    if (type === 'newComment') {
        text = 'commented on your post'
    }
    if (type === 'newFollower') {
        text = 'followed you'
    }
    return <>
        <div className="flex w-full p-8 border-b border-gray-300 " style={{ backgroundColor: 'aliceblue', borderRadius: '6px' }}>
            <img src={avatar} className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-4">
                <div className="flex">
                    <span className="font-semibold">{username}</span>
                    <span className="ml-1">@{username}</span>
                    <span className="ml-auto text-sm">Just now</span>
                </div>
                <p className="mt-1">
                    {text}
                </p>

            </div>
        </div>
    </>
}