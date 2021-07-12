import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { Avatar, Badge } from 'antd'
import { useSelector } from 'react-redux';

const FileUpload = ({values, setValues, setLoading}) => {
    const {user} = useSelector((state) => ({...state}));

    const fileUploadAndResize = (e) => {

        let files = e.target.files;
        let  allUploadFiles = values.images;

        if(files){
            setLoading(true)
            for (let i=0; i< files.length; i++){
                Resizer.imageFileResizer(
                    files[i], 
                    720, 
                    720, 
                    'JPEG', 
                    100, 
                    0, 
                    (uri) => {
                    // console.log(uri);
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
                        headers: {
                            authtoken: user ? user.token: ''
                        }
                    }
                )
                .then((res) => {
                    console.log('IMAGE UPLOAD RES DATA', res)
                    setLoading(false)
                    allUploadFiles.push(res.data)

                    setValues({...values, images: allUploadFiles})
                })
                .catch(err => {
                    setLoading(false)
                    console.log('CLOUDINARY UPLOAD ERR', err)
                })
                }, 
                    'base64'
                );
            }
        }
    }
    const handleImageRemove = (public_id) => {
        setLoading(true)
        // console.log('remove image', public_id)
        axios.post(
            `${process.env.REACT_APP_API}/removeimage`, 
            {public_id}, 
            {
                headers: {
                    authtoken: user ? user.token : ''
            }
        })
        .then((res) => {
            setLoading(false)
            const {images} = values;
            let filteredImages = images.filter((item) => {
                return item.public_id !== public_id;
            });
            setValues({ ...values, images: filteredImages });
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    return(
    <>
    <div className="row"  style={{width: 'auto'}}>
        {values.images && values.images.map((image) => {
            return(
                <span className="avatar-item" key={image.public_id}>
                    <Badge 
                        count="X"
                        style={{cursor: 'pointer'}}  
                        onClick={() => handleImageRemove(image.public_id)}
                        >

                        <Avatar 
                        src={image.url} 
                        size={150} 
                        shape="square"
                        className="ml-3 mb-2"
                        />
                    </Badge>
                </span>
            )
        })}
    </div>
    <div className="row">
        <label className="btn btn-primary btn-raised col-2">
            Choose File
        <input 
            type="file" 
            multiple
            hidden 
            accept="images/*" 
            onChange={fileUploadAndResize}
        />
        </label>
    </div>
    </>
    )
}

export default FileUpload