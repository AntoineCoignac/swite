import Navbar from "./components/Navbar";
import Search from "./components/Search";
import RecordButton from "./components/RecordButton";

export default function Home() {
  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="content-wrapper">
        <Search />
      </div>
        <RecordButton />
    </div>
  );
}
