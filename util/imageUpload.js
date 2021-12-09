import axios from 'axios';

const uploadPic = async (media) => {
    try {
        const form = new FormData();
        form.append('file', media);
        form.append('upload_preset', 'sackbook')
        const { data } = await axios.post(process.env.CLOUDINARY_URL,
            form,
            {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
        return data.url
    } catch (err) {
        console.log(err)
    }
}

export default uploadPic;