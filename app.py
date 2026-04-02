from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Dummy users (for login)
users = [
    {"username": "admin", "password": "123"}
]

# Dummy problems
problems = [
    {
        "id": 1,
        "title": "Print Hello World",
        "description": "Print hello world",
    },
    {
        "id": 2,
        "title": "Sum Two Numbers",
        "description": "Take two numbers and return sum",
    },
    {
        "id": 3,
        "title": "Check Even or Odd",
        "description": "Check if number is even or odd",
    }
]

# LOGIN API
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({"message": "Login successful"})
    
    return jsonify({"message": "Invalid credentials"}), 401


# GET PROBLEMS
@app.route("/problems", methods=["GET"])
def get_problems():
    return jsonify(problems)


# RUN CODE (basic simulation)
@app.route("/run", methods=["POST"])
def run_code():
    data = request.json
    code = data.get("code")

    try:
        # WARNING: simple exec (for demo only)
        local_vars = {}
        exec(code, {}, local_vars)
        return jsonify({"output": "Code executed"})
    except Exception as e:
        return jsonify({"output": str(e)})


# ✅ IMPORTANT FOR RENDER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)