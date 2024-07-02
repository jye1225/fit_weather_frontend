import { Link } from 'react-router-dom';
import style from '../css/Codi.module.css';

import CodiGuidelineBox from '../components/CodiGuidelineBox';
import Header from "../components/Header";
import H2Codi from "../components/H2Codi";
import CodyWeather from "../components/CodyWeather";
import CodiTalk from "../components/CodiTalk";


import Avatar from "../components/Avatar";
import CodiLogBoxsMain from "../components/CodiLogBoxsMain";
import useImageUrlStore from "../store/imageUrlStore";

const CodiMain = () => {
  const matchingUrl = useImageUrlStore((state) => state.matchingUrl);
  return (
    <main className={`mw ${style.codiMain}`}>
      <Header />
      <H2Codi />
      <CodyWeather />
      <CodiTalk />
      <Avatar
        topUrl={matchingUrl.tops}
        bottomUrl={matchingUrl.bottoms}
        outerUrl={matchingUrl.outers}
      />


      <CodiLogBoxsMain />

      <div className={style.bigBtnCon}>
        <Link to={'/codiLog'} className={`fontBodyM ${style.bigBtn}`}>
          <span>내 코디 기록</span>
          <img src="img/icons/common/calendar.svg" alt="" />
        </Link>
        <button className={`fontBodyM ${style.bigBtn}`}>
          <span>기온별 추천 의류 전체보기</span>
          <img src="img/icons/common/alertSquare.svg" alt="" />
        </button>
      </div>
      <CodiGuidelineBox />
    </main>
  );
};

export default CodiMain;
