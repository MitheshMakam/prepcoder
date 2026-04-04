import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "https://prepcoder-final.onrender.com";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "/problems";
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Backend not reachable");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>PrepCoder Login</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch(`${API}/problems`)
      .then(res => res.json())
      .then(data => setProblems(data))
      .catch(() => alert("Failed to load problems"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Problems</h1>

      {problems.map((p) => (
        <div key={p.id} style={{ margin: "10px 0" }}>
          {p.title}
        </div>
      ))}
    </div>
  );
}

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/problems"
          element={isLoggedIn ? <Problems /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;