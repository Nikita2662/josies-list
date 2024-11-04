import "./Header.css";
import Logo from "./Logo";

let primaryColorDark = "#3ea467";

function Header() {
  return (
    <nav>
      <div className="logo-title">
        <Logo size={50} />
        <h1>Josie's List</h1>
      </div>
      <div className="nav-links">
        <p>Buy</p>
        <p>Sell</p>
        <div className="container">
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
        </div>
      </div>
    </nav>
  );
}

export default Header;