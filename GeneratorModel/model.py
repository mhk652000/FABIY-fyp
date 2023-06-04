import tensorflow as tf
from keras.models import load_model
from flask import Flask, request, make_response
from PIL import Image
import io
import numpy as np
from flask_cors import CORS
from data_aug import augmented_input_image


model = load_model('generator.h5')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    input_image = request.files['image']
    input_image = Image.open(input_image)
    input_image = input_image.convert('RGB')  # convert to RGB format
    input_image = input_image.resize((256, 256))  # resize the input image
    input_image = np.array(input_image)  # convert to numpy array
    input_image = input_image / 255.0  # normalize pixel values
    input_image = np.expand_dims(input_image, axis=0)  # add batch dimension

    input_image = augmented_input_image(input_image)
    input_image = np.expand_dims(input_image, axis=0)  # add batch dimension
    print(input_image.shape)


    # Use the loaded model to make predictions on the input image
    output_image = model(input_image, training=True)
    output_image = output_image * 255.0  # denormalize pixel values
    output_image = tf.cast(output_image, tf.uint8)  # cast to uint8 for image encoding
    
    # Encode the output image as PNG and return as a Flask response
    output_buffer = io.BytesIO()
    output_image = Image.fromarray(output_image.numpy()[0])
    output_image.save(output_buffer, format='PNG')
    response = make_response(output_buffer.getvalue())
    response.headers['Content-Type'] = 'image/png'
    return response

if __name__ == '__main__':
    app.run( port=5000, debug=True)