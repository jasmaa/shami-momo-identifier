import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageDropzone = props => {

    const onDrop = useCallback(acceptedFiles => {

        if (acceptedFiles && acceptedFiles.length >= 1) {
            props.uploadImage(acceptedFiles[0]);
        }

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="d-flex flex-column justify-content-center align-items-center drop-box">
            <input {...getInputProps()} />
            {
                isDragActive
                    ? <p>Drop the files here ...</p>
                    : <p>Drag 'n' drop some files here, or click to select files</p>
            }
            {
                props.imgSrc === ''
                    ? null
                    : <img src={props.imgSrc} className="upload-img my-3" />
            }
        </div>
    );
}

export default ImageDropzone;