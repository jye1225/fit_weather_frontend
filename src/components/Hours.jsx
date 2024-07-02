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
    ptyData,
    popData,
    dust,
    fetchLocation,
    fetchWeatherData,
  } = useFetchStore();
  const { kakao } = window;

  // console.log(pmSKY); // 처음엔 undefind가 뜬단 말이지...
  // console.log(ptyData);

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
          const skyValue = skyData?.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          const ptyValue = ptyData?.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          const tempValue = tempData?.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          const popValue = popData?.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          // console.log(popValue);

          // 날씨 아이콘 객체
          const weatherIcons = {
            "1_0": "img/icons/weather/clear.svg", // 맑음
            "4_0": "img/icons/weather/overcast.svg", // 흐림
            "3_0": "img/icons/weather/cloudy.svg", // 구름많음
            "3_1": "img/icons/weather/cloudyNrain.svg", // 구름많고 비
            "4_1": "img/icons/weather/overcastNrain.svg", // 흐리고 비
            "3_4": "img/icons/weather/cloudyNshower.svg", // 구름많고 소나기
            "4_4": "img/icons/weather/overcastNshower.svg", // 흐리고 소나기
            "4_3": "img/icons/weather/overcastNsnow.svg", // 흐리고 눈
            "3_3": "img/icons/weather/cloudyNsnow.svg", // 구름많고 눈
            "3_2": "img/icons/weather/cloudyNsleet.svg", // 구름많고 비/눈
            "4_2": "img/icons/weather/overcastNsleet.svg", // 흐리고 비/눈
          };
          // 날씨 이미지 조건문
          // skyValue와 ptyValue가 undefined인 경우에 대한 처리 추가
          const imgSrc =
            weatherIcons[`${skyValue?.fcstValue}_${ptyValue?.fcstValue}`] ||
            "img/icons/weather/clear.svg"; // 기본 이미지 맑음으로 설정

          // 활동 조건문 (자외선 지수 추가 예정)
          // 싸이클 조건문
          let cycleState = "";
          if (
            (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
            (dust === "좋음" || "보통") &&
            popValue?.fcstValue <= 50
          ) {
            cycleState = "좋음";
          } else {
            cycleState = "나쁨";
          }

          // 러닝 조건문
          let runningState = "";
          if (
            (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
            (dust === "좋음" || "보통") &&
            popValue?.fcstValue <= 50
          ) {
            runningState = "좋음";
          } else {
            runningState = "나쁨";
          }

          // 등산 조건문
          let hikingState = "";
          if (
            (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
            (dust === "좋음" || "보통") &&
            popValue?.fcstValue <= 50
          ) {
            hikingState = "좋음";
          } else {
            hikingState = "나쁨";
          }

          // 빨래 조건문
          let washState = "";
          if (
            (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 15) &&
            popValue?.fcstValue <= 30
          ) {
            washState = "좋음";
          } else {
            washState = "나쁨";
          }

          // 반려동물 산책 조건문
          let petState = "";
          if (
            (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
            (dust === "좋음" || "보통") &&
            popValue?.fcstValue <= 30
          ) {
            petState = "좋음";
          } else {
            petState = "나쁨";
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
                <p className="fontTitleS">{cycleState}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Hours;
