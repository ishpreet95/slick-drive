import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Table from "./components/table.component";
import UserContext from "./contexts/userContext";

function App() {
  const user = localStorage.getItem("token") ? true : false;
  const [isLogged, setIsLogged] = useState(user);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ isLogged, setIsLogged }}>
          <Nav />
          {isLogged ? (
            <Routes>
              <Route path="/" element={<Table />}/>
              <Route path="/table/:id" element={<Table />}/> 
            </Routes>
          ) : (
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          )}
        </UserContext.Provider>
      </div>
    </Router>
  );
}
export default App;
