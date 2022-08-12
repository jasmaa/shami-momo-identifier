import { InferenceSession, Tensor } from "onnxruntime-web";
import { softmax } from "./utils";

const RESNET18_WIDTH = 224;
const RESNET18_HEIGHT = 224;

function imageDataArrayToRgba(data: Uint8ClampedArray) {
  const r = [];
  const g = [];
  const b = [];
  const a = [];
  for (let i = 0; i < data.length; i += 4) {
    r.push(data[i + 0]);
    g.push(data[i + 1]);
    b.push(data[i + 2]);
    a.push(data[i + 3]);
  }
  return [r, g, b, a];
}

export const shamiMomoResnet = {
  width: RESNET18_WIDTH,
  height: RESNET18_HEIGHT,
  classify: async (inputImgData: ImageData) => {
    const session = await InferenceSession.create('./models/final_model.onnx');

    const [inputR, inputG, inputB, _] = imageDataArrayToRgba(inputImgData.data);
    const tensorData = [...inputR, ...inputG, ...inputB].map(v => v / 256.0);

    const inData = Float32Array.from(tensorData);
    const inTensor = new Tensor('float32', inData, [1, 3, RESNET18_WIDTH, RESNET18_HEIGHT]);

    const feeds = { 'actual_input': inTensor };
    const results = await session.run(feeds);

    const probabilities = softmax(results.output.data as Float32Array)
      .map(v => 100 * v);

    return probabilities;
  },
}