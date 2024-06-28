import style from '../css/CommunityFilter.module.css';
import TodayCoordiButton from './TodayCoordiButton';
import TodayWeatherButton from './TodayWeatherButton';
import { buttonStore } from '../store/talkbuttonStore';
import { usePostData } from '../store/postDataStore';

function CommunityFilter() {
  const { setPostsData, originalData } = usePostData();
  const { onBtn, setOnBtn } = buttonStore();
  const buttonId = 'all';
  const isOn = onBtn === buttonId;

  const allBtnClick = () => {
    setOnBtn('all');
    setPostsData(originalData);
  };

  const getCatePost = async (category) => {
    // console.log('오리지널', originalData);
    const filtered = originalData.filter((post) => post.category === category);
    setPostsData(filtered);
  };

  const todayWeatherBtn = async () => {
    setOnBtn('todayWeather');
    getCatePost('weather');
  };

  const todayCoordiBtn = () => {
    setOnBtn('todayCoordi');
    getCatePost('coordi');
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
