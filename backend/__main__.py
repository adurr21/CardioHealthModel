from flask import Flask
import pickle
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier


model_file = "project-model.pkl"  


# load model from pickle file
with open(model_file, 'rb') as file:  
    model = pickle.load(file)

# evaluate model 
y_predict = model.predict(X_test)