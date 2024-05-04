import React, { useState } from "react";
import Taskinput from "./components/Taskinput";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);

    // Initialize user's to-do list if not already present
    if (!localStorage.getItem(username)) {
      localStorage.setItem(username, JSON.stringify([]));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <div className="">
      {isLoggedIn ? (
        <>
          <div className="container ">
            <div className="row justify-content-center">
              <div
                className=""
                style={{
                  background: "#DDDDDD",
                  padding: "10px",
                  borderRadius: "5px",
                  marginTop: "0px",
                }}
              >
                <div className="row">
                  <div className="col text-center">
                    <h1
                      className="text-black "
                      style={{ fontSize: "20px", padding: "10px" }}
                    >
                      Welcome {username}
                    </h1>
                  </div>
                  <div
                    className="col text-center"
                    style={{
                      padding: "10px",
                    }}
                  >
                    <button
                      className="btn btn-light ms-5"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Taskinput username={username} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
