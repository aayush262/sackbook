import React, { useRef, useState } from 'react';
import notify from './../util/notify';
import axios from 'axios';
import baseUrl from '../util/baseUrl';
import Cookies from 'js-cookie';
import uploadPic from '../util/imageUpload';

export const CreatePost = ({ user, setPosts }) => {

    const [postData, setPostData] = useState({
        text: "",
        location: ""
    });
    const [media, setMedia] = useState()
    const [mediaPreview, setMediaPreview] = useState()

    const inputRef = useRef();
    const mediaRef = useRef();

    const handleFile = () => {
        mediaRef.current.click();
    }
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setPostData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        if (name === "media") {
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]))
        }
    }
    const handleClick = async () => {

        const newData = { ...postData };
        if (postData.text.length < 1) {
            notify.warn('Please provide text before you post')
        }
        if (media) {
            newData.picUrl = await uploadPic(media);
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/post`, newData, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            })
            notify.success(data.msg)
            inputRef.current.value = "";
            setMediaPreview(null);
            setPosts(prev => [data.post, ...prev])
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex w-full p-8 border-b-4 border-gray-300">
            <img src={user.avatarUrl} className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full" />
            <div className="flex flex-col flex-grow ml-4">
                <textarea ref={inputRef} onChange={handleChange} className="p-3 bg-transparent border border-gray-500 rounded-sm" name="text" rows={3} placeholder="What's happening?" defaultValue={""} />
                {mediaPreview && <img className="h-64 object-cover" src={mediaPreview} alt={"media"}/>}
                <div className="flex justify-between mt-2">
                    <button onClick={handleFile} className="flex items-center h-8 px-3 text-xs rounded-sm bg-transparent border-solid border-2 border-indigo-500 hover:bg-gray-200" ><input name="media" className="hidden" onChange={handleChange} ref={mediaRef} type="file" />Attach</button>
                    <button onClick={handleClick} className="flex items-center h-8 px-3 text-xs rounded-sm bg-gray-300 hover:bg-gray-400">Post</button>
                </div>
            </div>
        </div>
    )
}