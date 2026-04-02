import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./App.css";

const API = "https://prepcoder-1.onrender.com/"; // change after deploy

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [problems, setProblems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState("# write your code here");

  useEffect(() => {
    if (loggedIn) loadProblems();
  }, [loggedIn]);

  async function handleLogin() {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) setLoggedIn(true);
    else alert(data.message);
  }

  async function loadProblems() {
    const res = await fetch(`${API}/problems`);
    const data = await res.json();
    setProblems(data);
  }

  async function runCode() {
    const res = await fetch(`${API}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    alert(data.output || data.error);
  }

  if (selectedProblem) {
    return (
      <div className="container">
        <div className="topbar">
          <button className="button" onClick={() => setSelectedProblem(null)}>
            ← Back
          </button>
          <button className="button" onClick={runCode}>
            Run Code
          </button>
        </div>

        <h2>{selectedProblem.title}</h2>
        <span className={`badge ${selectedProblem.difficulty.toLowerCase()}`}>
          {selectedProblem.difficulty}
        </span>

        <div className="editor-container">
          <Editor
            height="400px"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
          />
        </div>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="container">
        <h2>PrepCoder 🚀</h2>

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Problems</h2>

      {problems.map((p) => (
        <div key={p.id} className="card">
          <div>
            <div>{p.title}</div>
            <span className={`badge ${p.difficulty.toLowerCase()}`}>
              {p.difficulty}
            </span>
          </div>

          <button
            className="button"
            onClick={() => {
              setSelectedProblem(p);
              setCode("# write your code here");
            }}
          >
            Solve
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;