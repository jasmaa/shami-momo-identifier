import onnxruntime as rt
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

classes = ['momo', 'shamiko']

# Load image
im = Image.open("shami_test.png")
im = im.convert('RGB')
im = im.resize((224, 224))
in_data = np.array(im)
in_data = in_data / 256
in_data = np.rollaxis(in_data, 2)
in_data = np.expand_dims(in_data, axis=0)
in_data = in_data.astype(np.float32)

# Load model
sess = rt.InferenceSession('../backend/models/final_model.onnx')
input_name = sess.get_inputs()[0].name

# Run through model
out_data = sess.run(None, {input_name: in_data})
out_data = np.nan_to_num(out_data)

print(out_data)
print(classes[np.argmax(out_data)])
