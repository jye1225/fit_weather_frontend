import style from '../css/TodayCoordiButton.module.css';
import { buttonStore } from '../store/TalkbuttonStore';

function TodayCoordiButton({ onClick }) {
  const { onBtn } = buttonStore();
  const buttonId = 'todayCoordi';
  const isOn = onBtn === buttonId;

  return (
    <button
      id="todayC"
      className={`fontBodyM ${style.todayC} ${isOn ? style.on : ''}`}
      onClick={onClick}
      data-cate={'todayCoordi'}
    >
      오늘코디
    </button>
  );
}

export default TodayCoordiButton;
