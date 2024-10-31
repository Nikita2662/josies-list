import "./Header.css";

function Header() {
  return (
    <nav>
      <div className="logo"></div>
      <div className="nav-links">
        <p>Buy</p>
        <p>Sell</p>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <circle
                cx="30"
                cy="30"
                r="27.5"
                stroke="#3EA467"
                stroke-width="5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="37"
              viewBox="0 0 38 37"
              fill="none"
            >
              <path
                d="M19 18.5C22.4978 18.5 25.3333 15.739 25.3333 12.3333C25.3333 8.92754 22.4978 6.16663 19 6.16663C15.5022 6.16663 12.6666 8.92754 12.6666 12.3333C12.6666 15.739 15.5022 18.5 19 18.5Z"
                fill="#3EA467"
              />
              <path
                d="M31.6667 29.2916V30.8333C31.6667 31.2422 31.4999 31.6343 31.203 31.9234C30.906 32.2125 30.5033 32.375 30.0834 32.375H7.91671C7.49678 32.375 7.09405 32.2125 6.79712 31.9234C6.50019 31.6343 6.33337 31.2422 6.33337 30.8333V29.2916C6.33337 26.8384 7.33426 24.4856 9.11586 22.7509C10.8975 21.0162 13.3138 20.0416 15.8334 20.0416H22.1667C24.6863 20.0416 27.1026 21.0162 28.8842 22.7509C30.6658 24.4856 31.6667 26.8384 31.6667 29.2916Z"
                fill="#3EA467"
              />
            </svg>
          </svg>
        </div>
      </div>
    </nav>
  );
}

export default Header;
