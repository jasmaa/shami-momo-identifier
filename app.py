from flask import Flask, request, jsonify, render_template, flash, redirect
import onnxruntime as rt
import numpy as np
from PIL import Image
import base64

classes = ['shamiko', 'momo']

# Load model
sess = rt.InferenceSession('models/final_model.onnx')
input_name = sess.get_inputs()[0].name

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


@app.route('/')
def index():
    """Index for testing
    """
    return render_template('index.html')


@app.route('/api/v1/identify', methods=['POST'])
def identify():

    if 'file' not in request.files:
        return jsonify({"response": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"response": "No file selected"}), 400

    # Load image
    try:
        im = Image.open(file.stream)
    except OSError:
        return jsonify({"response": "Not a supported image format"}), 400

    im = im.convert('RGB')
    im = im.resize((224, 224))
    in_data = np.array(im)
    in_data = np.rollaxis(in_data, 2)
    in_data = np.expand_dims(in_data, axis=0)
    in_data = in_data.astype(np.float32)

    # Run through model
    out_data = sess.run(None, {input_name: in_data})
    out_data = np.nan_to_num(out_data)
    
    return jsonify({"response": classes[np.argmax(out_data)]}), 200
