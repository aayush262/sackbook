import React, { createContext } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';
import baseUrl from '../util/baseUrl';
import { NotificationBox } from '../components/notificationBox';

export const Notifications = createContext();

const Notification = ({ user, notifications }) => {
    return <>
        <Notifications.Provider value={notifications}><NotificationBox user={user} /></Notifications.Provider>
    </>
}

export async function getServerSideProps(context) {
    try {
        const { token } = parseCookies(context);
        if (!token) {
            return {
                redirect: {
                    location: '/login',
                    permanent: false
                }
            }
        }
        const { data } = await axios.get(`${baseUrl}/api/auth`, {
            headers: {
                Authorization: token
            }
        })

        const res = await axios.get(`${baseUrl}/api/notification`, {
            headers: {
                Authorization: token
            }
        });
        return {
            props: {
                user: data.user,
                notifications: res.data.notification
            }
        }
    } catch (err) {
        destroyCookie(context, 'token');
        return {
            redirect: {
                location: '/login',
                permanent: false
            }
        }
    }
}
export default Notification;