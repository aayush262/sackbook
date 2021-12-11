import React, { useContext } from 'react';
import { SideBar } from './../components/sideBar';
import { ProfilePosts } from './profilePosts';
import { Posts } from './../pages/[username]';

export const Profile = ({ user, profile, followerStats }) => {
    const posts = useContext(Posts);
    return (
        <div className="flex justify-center w-screen h-screen px-4 text-gray-700">
            <div className="flex w-full max-w-screen-lg">
                <SideBar user={user} />
                <div className=" overflow-auto profile-page">
                    <section className="relative block" style={{ height: 300 }}>
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage:
                                    'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")'
                            }}
                        >
                            <span
                                id="blackOverlay"
                                className="w-full h-full absolute opacity-50 bg-black"
                            />
                        </div>
                        <div
                            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                            style={{ height: 70 }}
                        >
                            <svg
                                className="absolute bottom-0 overflow-hidden"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x={0}
                                y={0}
                            >
                                <polygon
                                    className="text-blueGray-200 fill-current"
                                    points="2560 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <img
                                                    alt="..."
                                                    src={profile.user.avatarUrl}
                                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute h-40 w-40 -m-16 -ml-20 lg:-ml-16"
                                                    style={{ maxWidth: 150 }}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button
                                                    className="bg-indigo-500 active:bg-indigo-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                >
                                                    Folow
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                        {followerStats.followers.length}
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">Followers</span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                        {followerStats.following.length}
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">Following</span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                        {posts.length}
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">Posts</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            {profile.user.username}
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />{" "}
                                            Los Angeles, California
                                        </div>
                                        <div className="mb-2 text-blueGray-600 mt-10">
                                            {profile.bio ? profile.bio : 'No bio'}
                                        </div>

                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="invisible mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    An artist of considerable range, Jenna the name taken by
                                                    Melbourne-raised, Brooklyn-based
                                                </p>
                                                <div className="flex flex-col flex-grow border-l border-r border-gray-300">
                                                    <ProfilePosts/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

