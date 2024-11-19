import Header from "../components/Header";
import BlueFlag from "../components/blueFlag.png";
import GreenFlag from "../components/greenFlag.png";
import Logo from "../components/Logo";
import SafeArea from "../components/SafeArea";
import { useGoogleLogin } from "@react-oauth/google";
import "./SignIn.css";

function SignIn() {
  const createAccountClick = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <>
      <Header />
      <SafeArea>
        <header className="header">
          <div className="column-left">
            <p className="p-welcome"> welcome to</p>
            <h1 className="head-title">Josie's List</h1>
            <p className="p-byUcla"> made by UCLA students</p>
            <p className="p-forUcla"> for UCLA students</p>
            <img src={GreenFlag} className="greenFlag" alt="" />
            <Logo size={150} className="p-logo" />
          </div>
          <div className="column-right">
            <p className="p-sign">sign in</p>
            <img src={BlueFlag} alt="" />
            <p className="p-google"> with google (@g.ucla.edu)</p>
            <button className="button sign-in" onClick={() => alert("Sign In")}>
              Sign In
            </button>
            <p className="button p-or">-or-</p>
            <button
              className="button create-account"
              onClick={() => createAccountClick()}
            >
              Create An Account
            </button>
          </div>
        </header>
      </SafeArea>
    </>
  );
}

export default SignIn;
