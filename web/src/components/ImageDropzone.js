import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ImageDropzone = props => {

    const onDrop = useCallback(acceptedFiles => {

        if (acceptedFiles && acceptedFiles.length >= 1) {
            props.uploadImage(acceptedFiles[0]);
        }

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

    return (
        <div
            {...getRootProps()}
            className="d-flex flex-column justify-content-center align-items-center drop-box"
            style={{ backgroundColor: isDragActive ? 'gainsboro' : 'lightgray' }}
        >
            <input {...getInputProps()} />

            {
                props.imgSrc === ''
                    ? (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <FontAwesomeIcon icon={faUpload} className="drop-box-text my-2" />
                            <p className="drop-box-text">Choose a file or drag it here</p>
                        </div>
                    )
                    : <img src={props.imgSrc} className="upload-img my-3" />
            }
        </div>
    );
}

export default ImageDropzone;