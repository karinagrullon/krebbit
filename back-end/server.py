from flask import Flask
import json

app = Flask(__name__)

# Members API route
@app.route("/members")
def members():
    return {"members": ["member 1", "member 2", "member 3"]}

# Stories API route
@app.route("/stories")
def stories():
    # read file
    with open('data/data.json', 'r') as fileData:
        data = fileData.read()

    # parse file
    obj = json.loads(data)
    return obj

if __name__ == "__main__":
    app.run(debug=True)