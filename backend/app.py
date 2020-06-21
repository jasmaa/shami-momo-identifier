import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import onnxruntime as rt
import numpy as np
from PIL import Image
import base64

app = Flask(__name__, static_folder='public/')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
CORS(app)

classes = ['momo', 'shamiko']

# Load model
sess = rt.InferenceSession('models/final_model.onnx')
input_name = sess.get_inputs()[0].name

# Serve React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


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
    in_data = in_data / 256
    in_data = np.rollaxis(in_data, 2)
    in_data = np.expand_dims(in_data, axis=0)
    in_data = in_data.astype(np.float32)

    # Run through model
    out_data = sess.run(None, {input_name: in_data})
    out_data = np.nan_to_num(out_data)

    return jsonify({"response": classes[np.argmax(out_data)]}), 200
