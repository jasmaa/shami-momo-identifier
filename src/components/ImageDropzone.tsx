import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default function ImageDropzone({ uploadImage, imgSrc }: { uploadImage: (value: File) => void, imgSrc: string }) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length >= 1) {
      uploadImage(acceptedFiles[0]);
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
        imgSrc === ''
          ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <FontAwesomeIcon icon={faUpload} className="drop-box-text my-2" />
              <p className="drop-box-text">Choose a file or drag it here</p>
            </div>
          )
          : <img src={imgSrc} className="upload-img my-3" />
      }
    </div>
  );
}