import { useState } from "react";

import Header from "../components/Header";
import PresentWeather from "../components/PresentWeather";
import WeatherTalk from "../components/WeatherTalk";
import Avatar from "../components/Avatar";
import Hours from "../components/Hours";
import Weekly from "../components/Weekly";

const IndexPage = () => {
  const [matchingUrl, setMatchingUrl] = useState({
    tops: "",
    bottoms: "",
    outers: "",
  });

  return (
    <>
      <Header />
      <main className="mw">
        <PresentWeather />
        <WeatherTalk setMatchingUrl={setMatchingUrl} />
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
