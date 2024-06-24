import style from '../css/CommunityFilter.module.css';
import TodayCoordiButton from './TodayCoordiButton';
import TodayWeatherButton from './TodayWeatherButton';
import { buttonStore } from '../store/TalkbuttonStore';

function CommunityFilter() {
  const { onBtn, setOnBtn } = buttonStore();
  const buttonId = 'all';
  const isOn = onBtn === buttonId;

  const allBtnClick = () => {
    setOnBtn(buttonId);
  };

  const todayWeatherBtn = () => {
    setOnBtn('todayWeather');
  };

  const todayCoordiBtn = () => {
    setOnBtn('todayCoordi');
  };

  return (
    <div className={style.commuCategory}>
      <h3 className="fontHead3">날씨패션 톡</h3>
      <div className={style.commuCateBtnCon}>
        <button
          className={`fontBodyM ${style.all} ${isOn ? style.on : ''} `}
          onClick={allBtnClick}
        >
          전체
        </button>
        <TodayWeatherButton onClick={todayWeatherBtn} />
        <TodayCoordiButton onClick={todayCoordiBtn} />
      </div>
    </div>
  );
}

export default CommunityFilter;
