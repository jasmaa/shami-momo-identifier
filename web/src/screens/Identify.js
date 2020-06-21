import React, { useState } from 'react';

import ImageDropzone from '../components/ImageDropzone';

const Identify = props => {

    const clientAxios = props.clientAxios;

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    const uploadImage = data => {

        setFile(data);

        const reader = new FileReader();
        reader.onload = e => {
            setImgSrc(reader.result);
        };

        reader.readAsDataURL(data);
    }

    const identifyImage = () => {

        const formData = new FormData();
        formData.append("file", file);

        clientAxios
            .post('/api/v1/identify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                console.log(res.data);
                setName(res.data.response);
                setFile(null);
            });
    }

    return (
        <div className="container fluid">
            <div className="d-flex flex-column">

                <h1>Shami-Momo Identifier</h1>

                <div className="my-3">
                    <ImageDropzone uploadImage={uploadImage} imgSrc={imgSrc} />
                </div>

                {
                    name === ''
                        ? null
                        : <h1 className="verdict-text my-3">It's <strong>{name}</strong>!</h1>
                }

                <div className={`btn btn-primary ${file ? '' : 'disabled'}`} onClick={e => identifyImage()}>
                    Identify!
                </div>

            </div>
        </div >
    );
}

export default Identify;