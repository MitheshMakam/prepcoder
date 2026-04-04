import React, { useState, useEffect } from "react";

const BASE_URL = "https://prepcoder-1.onrender.com";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [problems, setProblems] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // LOAD PROBLEMS
  const loadProblems = async () => {
    const res = await fetch(`${BASE_URL}/problems`);
    const data = await res.json();
    setProblems(data);
  };

  useEffect(() => {
    if (loggedIn) loadProblems();
  }, [loggedIn]);

  // LOGIN
  const handleLogin = async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // UI
  if (!loggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Login</h2>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Problems</h2>
      {problems.map((p) => (
        <div key={p.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;