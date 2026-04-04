from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Users
users = [
    {"username": "admin", "password": "123"}
]

# Problems
problems = [
    {"id": 1, "title": "Print Hello World", "description": "Print hello world"},
    {"id": 2, "title": "Sum Two Numbers", "description": "Return sum of two numbers"},
    {"id": 3, "title": "Even or Odd", "description": "Check even or odd"}
]

# LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({"success": True})
    
    return jsonify({"success": False}), 401


# GET PROBLEMS
@app.route("/problems", methods=["GET"])
def get_problems():
    return jsonify(problems)


# RUN CODE
@app.route("/run", methods=["POST"])
def run_code():
    data = request.json
    code = data.get("code")

    try:
        local_vars = {}
        exec(code, {}, local_vars)
        return jsonify({"output": "Code executed successfully"})
    except Exception as e:
        return jsonify({"output": str(e)})


# RENDER FIX
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)