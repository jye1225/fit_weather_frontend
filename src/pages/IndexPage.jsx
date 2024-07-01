import { useEffect } from "react";

import Header from "../components/Header";
import PresentWeather from "../components/PresentWeather";
import WeatherTalk from "../components/WeatherTalk";
import Avatar from "../components/Avatar";
import Hours from "../components/Hours";
import Weekly from "../components/Weekly";
import useImageUrlStore from "../store/imageUrlStore";

const IndexPage = () => {
  const matchingUrl = useImageUrlStore((state) => state.matchingUrl);
  useEffect(() => {
    console.log("IndexPage matchingUrl:", matchingUrl);
  }, [matchingUrl]);

  return (
    <>
      <Header />
      <main className="mw">
        <PresentWeather />
        <WeatherTalk />
        <Avatar
          topUrl={matchingUrl.tops}
          bottomUrl={matchingUrl.bottoms}
          outerUrl={matchingUrl.outers}
        />
        <Hours />
        <Weekly />
      </main>
    </>
  );
};

export default IndexPage;
