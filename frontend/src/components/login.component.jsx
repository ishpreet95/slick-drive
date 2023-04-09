import { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../contexts/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { isLogged, setIsLogged } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim().length === 0) {
      setErrorMsg("Email cannot be empty");
      setError(true);
    } else if (password.trim().length === 0) {
      setErrorMsg("Pssword cannot be empty");
      setError(true);
    } else {
      Axios.post("http://localhost:3000/user/login", {
        email,
        password,
      })
        .then((response) => {
          console.log(response);
          setError(false);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setIsLogged(true);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setErrorMsg(error.response.data.message[0].message || error.response.data.message);
        });
    }
  };

  return (
    <form>
      {isLogged ? (
        <div>
          <div className="mb-3 text-success">You are logged in</div>
          <div> Your username is {JSON.parse(localStorage.getItem("user")).username}</div>
        </div>
      ) : (
        <div>
          <h3>Sign In</h3>
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
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Sign In
            </button>
          </div>
          <p className="forgot-password text-right">
            New Here? <a href="/sign-up">Sign up</a>
          </p>
        </div>
      )}
    </form>
  );
}
