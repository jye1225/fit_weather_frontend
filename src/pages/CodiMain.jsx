import style from "../css/Codi.module.css";

import Header from "../components/Header";
import H2Codi from "../components/H2Codi";
import CodyWeather from "../components/CodyWeather";
import CodiTalk from "../components/CodiTalk";
// import CodiLogBox from "../components/CodiLogBox";


const CodiMain = () => {
  return (
    <main className={`mw ${style.codiMain}`}>
      <Header />
      <H2Codi />
      <CodyWeather />
      <CodiTalk />

      {/* <CodiLogBox /> */}
    </main>
  );
};

export default CodiMain;
