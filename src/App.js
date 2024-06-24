import "./css/common.css";
import Header from "./components/Header";
import PresentWeather from "./components/PresentWeather";
import CodyWeather from "./components/CodyWeather";
import Hours from "./components/Hours";
import Weekly from "./components/Weekly";

function App() {
  return (
    <div className="App">
      <Header />
      <PresentWeather />
      <CodyWeather />
      <Hours />
      <Weekly />
    </div>
  );
}

export default App;
