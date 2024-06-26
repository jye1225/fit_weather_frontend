import Header from "../components/Header";
import PresentWeather from "../components/PresentWeather";
import Avatar from "../components/Avatar";
import Hours from "../components/Hours";
import Weekly from "../components/Weekly";

const IndexPage = () => {
  return (
    <>
      <Header />
      <main className="mw">
        <PresentWeather />
        <Avatar />
        <Hours />
        <Weekly />
      </main>
    </>
  );
};

export default IndexPage;
