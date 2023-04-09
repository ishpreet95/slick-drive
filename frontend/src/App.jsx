import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "./components/nav.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import UserContext from "./contexts/userContext";

function App() {
  const user = localStorage.getItem("token") ? true : false;
  const [isLogged, setIsLogged] = useState(user);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ isLogged, setIsLogged }}>
          <Nav />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </div>
          </div>
        </UserContext.Provider>
      </div>
    </Router>
  );
}
export default App;
