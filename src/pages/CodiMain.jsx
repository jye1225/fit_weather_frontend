import { Link } from 'react-router-dom';
import style from '../css/Codi.module.css';

import Header from '../components/Header';
import H2Codi from '../components/H2Codi';
import CodyWeather from '../components/CodyWeather';
import CodiTalk from '../components/CodiTalk';
import CodiLogBoxsMain from '../components/CodiLogBoxsMain';

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
    </main>
  );
};

export default CodiMain;
