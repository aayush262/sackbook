import React from 'react';
import baseUrl from './../util/baseUrl';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';

const ProfilePage = ({ user, profile, followerStats }) => {
    return <>
        {user.username}
        {profile.user.username}
        <p>{followerStats.followers.length} Followers</p>
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
        const res = await axios.get(`${baseUrl}/api/profile/${context.params.username}`,{
            headers:{
                Authorization: token
            }
        })
        const profile = res.data.profile;
        const followerStats = res.data.followerStats;
        return {
            props: {
                user: data.user,
                profile,
                followerStats
            }
        }
    } catch (err) {
        destroyCookie(context, 'token')
        return redirectUser('/login')
    }
}