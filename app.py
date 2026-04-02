from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import tempfile
import os

app = Flask(__name__)
CORS(app)

USER = {"email": "test@test.com", "password": "1234"}

problems = [
    {"id": 1, "title": "Two Sum", "difficulty": "Easy"},
    {"id": 2, "title": "Reverse String", "difficulty": "Easy"},
    {"id": 3, "title": "Longest Substring", "difficulty": "Medium"},
]

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if data["email"] == USER["email"] and data["password"] == USER["password"]:
        return jsonify({"message": "Login success"})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/problems", methods=["GET"])
def get_problems():
    return jsonify(problems)

@app.route("/run", methods=["POST"])
def run_code():
    code = request.json.get("code")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as f:
            f.write(code.encode())
            filename = f.name

        result = subprocess.run(
            ["python", filename],
            capture_output=True,
            text=True,
            timeout=5
        )

        os.remove(filename)

        return jsonify({
            "output": result.stdout,
            "error": result.stderr
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run()