from flask import Flask
import onnxruntime as rt
import numpy as np
from PIL import Image

classes = ['shamiko', 'momo']

# Load model
sess = rt.InferenceSession('models/final_model.onnx')
input_name = sess.get_inputs()[0].name

app = Flask(__name__)

@app.route('/api/v1/identify')
def identify():
    
    # Load image
    im = Image.open("docs/shami_test.png")
    im = im.convert('RGB')
    im = im.resize((224, 224))
    in_data = np.array(im)
    in_data = np.rollaxis(in_data, 2)
    in_data = np.expand_dims(in_data, axis=0)
    in_data = in_data.astype(np.float32)

    # Run through model
    out_data = sess.run(None, {input_name: in_data})
    out_data = np.nan_to_num(out_data)
    
    return "Result: " + classes[np.argmax(out_data)]
