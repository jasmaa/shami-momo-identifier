import React, { useState } from 'react';

import ImageDropzone from '../components/ImageDropzone';

const Identify = props => {

    const clientAxios = props.clientAxios;

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [probability, setProbability] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [isError, setIsError] = useState(false);

    const uploadImage = data => {

        setFile(data);
        setName('');
        setProbability('');
        setIsError(false);

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
                setName(res.data.identity);
                setProbability(res.data.probability)
                setFile(null);
            })
            .catch(e => {
                setIsError(true);
            });
    }

    let verdict;
    if (isError) {
        verdict = (
            <div className="alert alert-danger">
                ⚠️ Error identifying image!
            </div>
        );
    } else if (name !== '' && probability !== '') {
        verdict = (
            <div>
                <h1 className="verdict-text">It's <strong>{name}</strong>!</h1>
                <h1 className="verdict-text">{probability}%</h1>
            </div>
        );
    }

    return (
        <div className="container fluid">
            <div className="d-flex flex-column m-3">

                <h1>🌸 Shami-Momo Identifier</h1>

                <div className="my-3">
                    <ImageDropzone uploadImage={uploadImage} imgSrc={imgSrc} />
                </div>

                <div className="my-3">
                    {verdict}
                </div>

                {
                    file
                        ? (
                            <div className="btn btn-primary" onClick={e => identifyImage()}>
                                Identify!
                            </div>
                        )
                        : (
                            <div className="btn btn-primary disabled" >
                                Identify!
                            </div>
                        )
                }


            </div>
        </div >
    );
}

export default Identify;