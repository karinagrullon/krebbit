from flask import Flask, request, jsonify
import json
# from textToSpeech import *

app = Flask(__name__)

# Stories API route
@app.route("/stories", methods = ['GET', 'POST'])
def stories():
    # read file
    with open('data/data.json', 'r') as fileData:
        data = fileData.read()

    # parse file
    obj = json.loads(data)
    return obj

if __name__ == "__main__":
    app.run(debug=True)