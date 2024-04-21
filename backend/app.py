import sys

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from joblib import load
import pandas as pd
import numpy as np
from sklearn import *
from sklearn.tree import DecisionTreeClassifier
from sklearn.pipeline import Pipeline
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OrdinalEncoder
from sklearn.preprocessing import FunctionTransformer
from sklearn.compose import ColumnTransformer
from imblearn.pipeline import Pipeline, make_pipeline
from imblearn.over_sampling import SMOTE

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.before_request
def before_request():
    headers = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type'}
    if request.method.lower() == 'options':
        return jsonify(headers)


@app.route('/')
def hello_world():  # put application's code here
    return 'Cardio Health Prediction Backend - CSCI 3360'


@app.route('/predict', methods=['POST'])
@cross_origin(origin='*')
def predict():
    json_ = request.json
    query = pd.json_normalize(json_)
    query = query.reindex(columns=cols, fill_value=-100)
    
    query['Alcohol Consumption'] = pd.to_numeric(query['Alcohol Consumption'])
    query['Height (cm)'] = pd.to_numeric(query['Height (cm)'], downcast='float')
    query['Weight (kg)'] = pd.to_numeric(query['Weight (kg)'], downcast='float')
    query['BMI'] = pd.to_numeric(query['BMI'], downcast='float')

    print(query)

    print(query.dtypes)
    print("Success getting table")

    prediction = list(model.predict(query))

    print(query.dtypes)

    print("success with prediction")
    
    return jsonify({'prediction': str(prediction)})


if __name__ == '__main__':
    try:
        port = int(sys.argv[1])
    except:
        port = 3360

    model = load('k-nearest-model.joblib')
    print("Model loaded successfully")

    cols = load('cols.joblib')
    print("Columns loaded successfully")

    print(cols)

    app.run(host='0.0.0.0', port=port, debug=True)
