import Header from "../components/Header";
import Logo from "../components/Logo";
import SafeArea from "../components/SafeArea";
import "./Landing.css";

function Landing() {
  return (
    <>
      <Header />
      <SafeArea>
        <div className="title-container">
          <h1 className="josie-title">Josie's</h1>
          <h1 className="list-title">List</h1>
        </div>
        <Logo size={350} className="big-logo" />
      </SafeArea>
    </>
  );
}

export default Landing;
