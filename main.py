from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Dummy users
users = [
    {"username": "admin", "password": "123"},
    {"username": "user", "password": "123"}
]

# Dummy problems
problems = [
    {"id": 1, "title": "Two Sum"},
    {"id": 2, "title": "Reverse String"},
    {"id": 3, "title": "Palindrome Check"}
]

# ✅ HOME
@app.route("/")
def home():
    return "Backend running"

# ✅ DEBUG (keep this for testing)
@app.route("/debug")
def debug():
    return "NEW CODE IS RUNNING"

# ✅ LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({"success": True})

    return jsonify({"success": False}), 401

# ✅ GET PROBLEMS (THIS WAS YOUR ISSUE)
@app.route("/problems", methods=["GET"])
def get_problems():
    return jsonify(problems)

# ✅ RUN CODE (basic)
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

# ✅ RENDER ENTRY
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)