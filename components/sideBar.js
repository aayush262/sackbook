import React from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

export const SideBar = ({ user }) => {
    const router= useRouter();
    return (
        <div className="flex flex-col w-64 py-4 pr-3">
            <div onClick={()=>router.push('/')} className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" >Home</div>
            <div className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" >Discover</div>
            <div  onClick={()=>router.push('/notification')} className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" >Notifications</div>
            <div className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" >Inbox</div>
            <div className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" >Saved Posts</div>
            <div className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" >Groups</div>
            <div className="px-3 py-2 mt-2 text-lg font-medium rounded-sm hover:bg-gray-300" >Profile</div>
            <div className="flex px-3 py-2 mt-2 mt-auto text-lg rounded-sm font-medium hover:bg-gray-200" >
                <img src={user.avatarUrl} className="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full" />
                <div className="flex flex-col ml-2">
                    <Link href={`/${user.username}`} className="mt-1 text-sm font-semibold leading-none">{user.username}</Link>
                    <span className="mt-1 text-xs leading-none">@{user.username}</span>
                </div>
            </div>
        </div>
    )
}