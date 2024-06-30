// import { useState } from "react";
import style from "../css/Codi.module.css";

import Header from "../components/Header";
import H2Codi from "../components/H2Codi";
import CodyWeather from "../components/CodyWeather";
import CodiTalk from "../components/CodiTalk";
import Avatar from "../components/Avatar";
// import CodiLogBox from "../components/CodiLogBox";

const CodiMain = () => {
  // const [matchingUrl, setMatchingUrl] = useState({
  //   tops: "",
  //   bottoms: "",
  //   outers: "",
  // });

  return (
    <main className={`mw ${style.codiMain}`}>
      <Header />
      <H2Codi />
      <CodyWeather />
      <CodiTalk />
      <Avatar />

      {/* <CodiLogBox /> */}
    </main>
  );
};

export default CodiMain;
