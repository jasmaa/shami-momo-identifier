export function softmax(data: Float32Array) {
  const numerators = data.map(v => Math.exp(v));
  const denominator = numerators.reduce((acc, curr) => acc + curr, 0);
  return numerators.map(v => v / denominator);
}

export const argmax = (data: Float32Array) => {
  if (data.length === 0) {
    throw new Error('Array is empty');
  }
  let maxIdx = 0;
  let maxValue = data[0];
  for (let i = 0; i < data.length; i++) {
    if (data[i] > maxValue) {
      maxIdx = i;
      maxValue = data[i];
    }
  }
  return [maxValue, maxIdx];
}