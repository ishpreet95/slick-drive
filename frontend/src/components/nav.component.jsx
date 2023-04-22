import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/userContext";

export default function Nav() {
  const { isLogged, setIsLogged } = useContext(UserContext);

  const signOutHandler = (e) => {
    e.preventDefault();
    setIsLogged(false);
    console.log(isLogged);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          Slick Drive⚡
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {!isLogged ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign Up
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={(e) => {
                    signOutHandler(e);
                  }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
