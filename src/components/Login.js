import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform authentication logic here (e.g., validate credentials)
    // For simplicity, I'm just checking if both username and password are non-empty
    if (username && password) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
      onLogin(username);
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div
          className="col-10 col-md-6"
          style={{
            background: "#6AE3A2",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <p className="text-white mb-3 text-center fw-bold">Todo List App</p>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            maxLength={15}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            maxLength={10}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-light w-100" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
