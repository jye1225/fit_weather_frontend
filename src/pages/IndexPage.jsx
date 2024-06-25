import Header from "../components/Header";
import PresentWeather from "../components/PresentWeather";
import Hours from "../components/Hours";
import Weekly from "../components/Weekly";

const IndexPage = () => {
  return (
    <>
      <Header />
      <PresentWeather />
      <Hours />
      <Weekly />
    </>
  );
};

export default IndexPage;
