import { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../contexts/userContext";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { isLogged, setIsLogged } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      setErrorMsg("Username cannot be empty");
      setError(true);
    } else if (email.trim().length === 0) {
      setErrorMsg("Email cannot be empty");
      setError(true);
    } else if (password.trim().length === 0) {
      setErrorMsg("Pssword cannot be empty");
      setError(true);
    } else {
      Axios.post("http://localhost:3000/user/register", {
        username,
        email,
        password,
      })
        .then((response) => {
          console.log(response);
          setError(false);
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMsg(
            error.response.data.message[0].message ||
              error.response.data.message
          );
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          {isLogged ? (
            <div>
              <div className="mb-3 text-success">You are logged in</div>
              <div>
                {" "}
                Your username is{" "}
                {JSON.parse(localStorage.getItem("user")).username}
              </div>
            </div>
          ) : (
            <div>
              <h3>Sign Up</h3>
              <div className="mb-3">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  placeholder="Enter Username"
                />
              </div>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              {error ? <div className="mb-3 text-danger">{errorMsg}</div> : ""}
              {success ? (
                <div className="mb-3 text-success">You are registered</div>
              ) : (
                ""
              )}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right">
                Already registered? <a href="/">Sign in</a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
