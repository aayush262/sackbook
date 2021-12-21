import React, { useContext } from 'react';
import { NotificationCard } from './notificationCard';
import { SideBar } from './sideBar';
import { Notifications } from './../pages/notification';

export const NotificationBox = ({ user }) => {
    const { notifications } = useContext(Notifications);
    return <>
        <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
            <div className="flex w-full max-w-screen-lg">
                <SideBar user={user} />
                <div className="flex flex-col flex-shrink-0 w-2/4 py-4 pl-4 overflow-auto">
                    <div className="flex flex-col flex-wrap -mb-10  text-center">
                        {notifications.length === 0 ?
                            <>No Any notifications</>
                            : notifications.map((notification)=>{
                                return <div key={notification._id}>
                                    <NotificationCard type={notification.type}
                                        username={notification.user.username}
                                        avatar={notification.user.avatarUrl}
                                    />
                                </div>
                            })}
                    </div>
                </div>
                <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
                </div>
            </div>
        </div>
    </>
}