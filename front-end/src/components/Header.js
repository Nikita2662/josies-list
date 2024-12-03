import "./Header.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { colors } from "../colors";
import { useContext } from "react";

let primaryColorDark = colors.darkPrimary;

function Header() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <Link className="logo-title" to={"/"}>
        <Logo size={50} />
        <h1>Josie's List</h1>
      </Link>
      <div className="nav-links">
        <Link to={user == null ? "/sign-in" : "/search"} className="link">
          <p>Buy</p>
        </Link>
        <Link to={user == null ? "/sign-in" : "/sell"} className="link">
          <p>Sell</p>
        </Link>
        <Link className="container" to={user == null ? "/sign-in" : "/profile"}>
          <svg
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
          >
            <rect fill="none" height="256" width="256" />
            <circle
              cx="128"
              cy="128"
              fill="none"
              r="96"
              stroke={primaryColorDark}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
            <circle
              cx="128"
              cy="120"
              fill="none"
              r="40"
              stroke={primaryColorDark}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
            <path
              d="M63.8,199.4a72,72,0,0,1,128.4,0"
              fill="none"
              stroke={primaryColorDark}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
