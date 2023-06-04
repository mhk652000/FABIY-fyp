import tensorflow as tf
from tensorflow import keras
from keras import layers
import random

def augmented_input_image(input_image):
    flip = ["horizontal","vertical"]
    factor = random.uniform(0,0.3)
    flip_index = random.randint(0,1)
    data_augmentation = keras.Sequential([
        
      layers.RandomFlip(flip[flip_index]),
      layers.RandomRotation(
          factor=factor,
          fill_mode='nearest')
    ])
    img = data_augmentation(input_image[0])
    return img