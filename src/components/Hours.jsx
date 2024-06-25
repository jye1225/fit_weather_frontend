// src/components/Hours.jsx
import style from "../css/Hours.module.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import useFetchStore from "../store/fetchStore";

const Hours = () => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    fetchWeatherData,
    commonValues,
    commonValues2,
  } = useFetchStore();
  const [checked, setChecked] = useState(false);
  const weatherHour = Array.from(
    { length: 12 },
    (_, i) => (new Date().getHours() + i) % 24
  );

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

  const btnToggle = () => {
    setChecked(!checked);
  };

  return (
    <section className={`mw ${style.hours}`}>
      <div className={style.top}>
        <h2 className="fontHead3">시간별 날씨!</h2>
        <span className="fontTitleS">활동</span>
        <label className={style.switch}>
          <input type="checkbox" onChange={btnToggle} />
          <span className={`fontBodyS ${style.slider}`}></span>
        </label>
      </div>
      <ul
        className={`${style.filterCon} ${
          checked ? style.visible : style.hidden
        }`}
      >
        <li className={`fontBodyM ${style.filter}`}>싸이클</li>
        <li className={`fontBodyM ${style.filter}`}>러닝</li>
        <li className={`fontBodyM ${style.filter}`}>등산</li>
        <li className={`fontBodyM ${style.filter}`}>빨래</li>
        <li className={`fontBodyM ${style.filter}`}>반려동물 산책</li>
      </ul>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        className={`mySwiper ${style.weatherCon}`}
      >
        {weatherHour.map((h, index) => {
          const value = commonValues?.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          const skyValue = commonValues2?.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          let imgSrc = "img/icons/weather/clear.svg";
          if (skyValue && skyValue.fcstValue === "1") {
            imgSrc = "img/icons/weather/clear.svg";
          } else if (skyValue && skyValue.fcstValue !== "1") {
            imgSrc = "img/icons/weather/cloudy.svg";
          }
          return (
            <SwiperSlide key={index}>
              <div className={style.weatherItem}>
                <p className="fontTitleS">{h}시</p>
                <div id="imgCon">
                  <img src={imgSrc} alt="날씨 이미지" />
                </div>
                <p className="fontTitleM">{value ? value.fcstValue : "-"}°C</p>
              </div>
              <div
                className={`${style.exItem} ${style.activity} ${
                  checked ? style.visible : style.hidden
                }`}
              >
                <img src="img/icons/exercise/cycle.svg" alt="싸이클" />
                <p className="fontTitleS">좋음</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Hours;
