import style from '../css/TodayWeatherButton.module.css';
import { buttonStore } from '../store/talkbuttonStore';

function TodayWeatherButton({ onClick }) {
  const { onBtn } = buttonStore();
  const buttonId = 'todayWeather';
  const isOn = onBtn === buttonId;

  return (
    <button
      id="todayW"
      className={`fontBodyM ${style.todayW} ${isOn ? style.on : ''}`}
      onClick={onClick}
      data-cate={'todayWeader'}
    >
      오늘날씨
    </button>
  );
}

export default TodayWeatherButton;
