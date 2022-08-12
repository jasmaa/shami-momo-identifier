import { useState } from 'react';
import ImageDropzone from '../components/ImageDropzone';
import { shamiMomoResnet } from '../resnet';
import { argmax } from '../utils';

const names = ['Momo', 'Shamiko'];

export default function Identify() {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [probability, setProbability] = useState<number>();
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reset = () => {
    setName('');
    setProbability(undefined);
  }

  const uploadImage = (data: File) => {
    reset();
    setFile(data);
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result as string);
    }
    reader.readAsDataURL(data);
  }

  const identifyImage = () => {
    reset();
    setIsLoading(true);
    (async () => {
      const canvas = document.getElementById('img-canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      const inputImage = new Image();
      inputImage.src = imgSrc;
      inputImage.onload = async () => {
        ctx.drawImage(inputImage, 0, 0, canvas.width, canvas.height);
        const inputImageData = ctx.getImageData(0, 0, shamiMomoResnet.width, shamiMomoResnet.width);
        const probabilities = await shamiMomoResnet.classify(inputImageData);
        const [maxValue, maxIdx] = argmax(probabilities);
        setName(names[maxIdx]);
        setProbability(Math.floor(maxValue));
        setIsLoading(false);
      }
    })();
  }

  return (
    <>
      <canvas id="img-canvas" width={shamiMomoResnet.width} height={shamiMomoResnet.height} hidden></canvas>
      <div className="container fluid">
        <div className="d-flex flex-column m-3">

          <h1>🌸 Shami-Momo Identifier</h1>

          <div className="my-3">
            <ImageDropzone uploadImage={uploadImage} imgSrc={imgSrc} />
          </div>

          <div className="my-3">
            {isLoading && (
              <div className='d-flex justify-content-center'>
                <div className="loader"></div>
              </div>
            )}
            {name && probability && (
              <div>
                <h1 className="verdict-text">It's <strong>{name}</strong>!</h1>
                <h1 className="verdict-text">{probability}%</h1>
              </div>
            )}
          </div>

          {
            file
              ? (
                <div className="btn btn-primary" onClick={identifyImage}>
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
      </div>
    </>
  );
}