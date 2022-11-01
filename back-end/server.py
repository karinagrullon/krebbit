from flask import Flask, request, jsonify
import json
from textToSpeech import *

app = Flask(__name__)

# Stories API route
@app.route("/stories", methods = ['GET', 'POST'])
def stories():
    # read file
    with open('data/data.json', 'r') as fileData:
        data = fileData.read()

    # parse file
    obj = json.loads(data)
    if request.method == "POST":
        print('post')
        params = request.get_json()
        storyParagraphs = params['storyParagraphs']
        for sp in storyParagraphs:
            speak(sp)
        # print(storyParagraphs)
        # speak('mono')
        print(storyParagraphs)
        speak(storyParagraphs)

    return obj

def fromTextToSpeech():
    speak('mono')
    storyParagraphs = request.json['storyParagraphs']
    print(storyParagraphs)
    speak(storyParagraphs)

if __name__ == "__main__":
    app.run(debug=True)