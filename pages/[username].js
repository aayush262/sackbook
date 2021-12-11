import React from 'react';
import baseUrl from './../util/baseUrl';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { Profile } from './../components/profile';

export const Posts = React.createContext();

const ProfilePage = ({ user, profile, followerStats, postsData }) => {
    return <>
        <Posts.Provider value={postsData}><Profile postsData={postsData} user={user} profile={profile} followerStats={followerStats}></Profile></Posts.Provider>
    </>
}
export default ProfilePage;

const redirectUser = (location) => {
    return {
        redirect: {
            destination: location,
            permanent: false
        }
    }
}
export async function getServerSideProps(context) {
    const { token } = parseCookies(context);
    try {
        if (!token) {
            return redirectUser('/login');
        }
        const { data } = await axios.get(`${baseUrl}/api/auth`, {
            headers: {
                Authorization: token
            }
        })
        const res = await axios.get(`${baseUrl}/api/profile/${context.params.username}`, {
            headers: {
                Authorization: token
            }
        })
        const response = await axios.get(`${baseUrl}/api/profile/post/${context.params.username}`, {
            headers: {
                Authorization: token
            }
        })
        const posts = response.data.posts;
        const profile = res.data.profile;
        const followerStats = res.data.followerStats;
        return {
            props: {
                user: data.user,
                profile,
                followerStats,
                postsData: posts
            }
        }
    } catch (err) {
        destroyCookie(context, 'token')
        return redirectUser('/login')
    }
}