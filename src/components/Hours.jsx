import style from "../css/Hours.module.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import useFetchStore from "../store/fetchStore";

const Hours = () => {
  const [checked, setChecked] = useState(false);
  const {
    location,
    regionFirstName,
    regionSecondName,
    tempData,
    skyData,
    fetchLocation,
    fetchWeatherData,
  } = useFetchStore();
  const { kakao } = window;

  const btnToggle = () => {
    setChecked(!checked);
  };

  const date = new Date();
  const hour = date.getHours();
  const weatherHour = Array.from({ length: 12 }, (_, i) => (hour + i) % 24);

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coords = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const region = result.find((item) => item.region_type === "H");
            if (region) {
              useFetchStore.setState({
                regionFirstName: region.region_1depth_name,
                regionSecondName: region.region_2depth_name,
              });
            } else {
              useFetchStore.setState({
                regionFirstName: result[0].region_1depth_name,
                regionSecondName: result[0].region_2depth_name,
              });
            }
          }
        }
      );
    }
  }, [location]);

  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      regionFirstName &&
      regionSecondName
    ) {
      fetchWeatherData();
    }
  }, [location, regionFirstName, regionSecondName]);

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
          const skyValue = skyData.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          const tempValue = tempData.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );

          let imgSrc = "img/icons/weather/clear.svg"; // 기본 이미지 설정
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
                <p className="fontTitleM">
                  {tempValue ? `${tempValue.fcstValue}°C` : "-°C"}
                </p>
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
