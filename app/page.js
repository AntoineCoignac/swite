import Navbar from "./components/Navbar";
import Search from "./components/Search";
import RecordButton from "./components/RecordButton";
import "./home.scss";
import Ctas from "./components/Ctas";

export default function Home() {
  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="content-wrapper">
        <div className="wrapper">
          <Ctas />
        </div>
        <div className="wrapper">
          <span className="text-large text-white">Cours</span>
          <Search />
        </div>
      </div>
        <RecordButton />
    </div>
  );
}
