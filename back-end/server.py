from flask import Flask

app = Flask(__name__)

# Members API route
@app.route("/members")
def members():
    return {"members": ["member 1", "member 2", "member 3"]}

if __name__ == "__main__":
    app.run(debug=True)