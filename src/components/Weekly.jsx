// src/components/Weekly.jsx
import style from "../css/Weekly.module.css";
import useFetchStore from "../store/fetchStore";
import { useEffect } from "react";

const Weekly = () => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    fetchWeatherData,
    pmSKY,
    pmPTY,
  } = useFetchStore();

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      regionFirstName &&
      regionSecondName
    ) {
      fetchWeatherData(
        location.latitude,
        location.longitude,
        regionFirstName,
        regionSecondName
      );
    }
  }, [location, regionFirstName, regionSecondName, fetchWeatherData]);

  return (
    <section className={style.weekly}>
      <h2 className="fontHead3">주간별 날씨!</h2>
      <ul className={style.con}>
        <li className={style.list}>
          <span className="fontTitleS">오늘</span>
          <div className={style.prob}>
            <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
            <span className="fontTitleS">50%</span>
          </div>
          <div className={style.icons}>
            <img src="img/icons/weather/clear.svg" alt="오전날씨" />
            <img src="img/icons/weather/cloudy.svg" alt="오후날씨" />
          </div>
          <div className={style.maxmin}>
            <span className="fontTitleL">21°C</span>
            <span className="fontTitleL">17°C</span>
          </div>
        </li>
        <li className={style.list}>
          <span className="fontTitleS">오늘</span>
          <div className={style.prob}>
            <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
            <span className="fontTitleS">50%</span>
          </div>
          <div className={style.icons}>
            <img src="img/icons/weather/clear.svg" alt="오전날씨" />
            <img src="img/icons/weather/cloudy.svg" alt="오후날씨" />
          </div>
          <div className={style.maxmin}>
            <span className="fontTitleL">21°C</span>
            <span className="fontTitleL">17°C</span>
          </div>
        </li>
        <li className={style.list}>
          <span className="fontTitleS">오늘</span>
          <div className={style.prob}>
            <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
            <span className="fontTitleS">50%</span>
          </div>
          <div className={style.icons}>
            <img src="img/icons/weather/clear.svg" alt="오전날씨" />
            <img src="img/icons/weather/cloudy.svg" alt="오후날씨" />
          </div>
          <div className={style.maxmin}>
            <span className="fontTitleL">21°C</span>
            <span className="fontTitleL">17°C</span>
          </div>
        </li>
        <li className={style.list}>
          <span className="fontTitleS">오늘</span>
          <div className={style.prob}>
            <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
            <span className="fontTitleS">50%</span>
          </div>
          <div className={style.icons}>
            <img src="img/icons/weather/clear.svg" alt="오전날씨" />
            <img src="img/icons/weather/cloudy.svg" alt="오후날씨" />
          </div>
          <div className={style.maxmin}>
            <span className="fontTitleL">21°C</span>
            <span className="fontTitleL">17°C</span>
          </div>
        </li>
        <li className={style.list}>
          <span className="fontTitleS">오늘</span>
          <div className={style.prob}>
            <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
            <span className="fontTitleS">50%</span>
          </div>
          <div className={style.icons}>
            <img src="img/icons/weather/clear.svg" alt="오전날씨" />
            <img src="img/icons/weather/cloudy.svg" alt="오후날씨" />
          </div>
          <div className={style.maxmin}>
            <span className="fontTitleL">21°C</span>
            <span className="fontTitleL">17°C</span>
          </div>
        </li>
        <li className={style.list}>
          <span className="fontTitleS">오늘</span>
          <div className={style.prob}>
            <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
            <span className="fontTitleS">50%</span>
          </div>
          <div className={style.icons}>
            <img src="img/icons/weather/clear.svg" alt="오전날씨" />
            <img src="img/icons/weather/cloudy.svg" alt="오후날씨" />
          </div>
          <div className={style.maxmin}>
            <span className="fontTitleL">21°C</span>
            <span className="fontTitleL">17°C</span>
          </div>
        </li>
        <li className={style.list}>
          <span className="fontTitleS">오늘</span>
          <div className={style.prob}>
            <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
            <span className="fontTitleS">50%</span>
          </div>
          <div className={style.icons}>
            <img src="img/icons/weather/clear.svg" alt="오전날씨" />
            <img src="img/icons/weather/cloudy.svg" alt="오후날씨" />
          </div>
          <div className={style.maxmin}>
            <span className="fontTitleL">21°C</span>
            <span className="fontTitleL">17°C</span>
          </div>
        </li>
        {/* Add more list items as needed */}
      </ul>
    </section>
  );
};

export default Weekly;
