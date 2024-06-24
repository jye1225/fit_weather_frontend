import style from "../css/Hours.module.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

const Hours = () => {
  const [checked, setChecked] = useState(false);
  const [temperature, setTemperature] = useState(Array(12).fill(null)); // 12시간 온도 저장용 배열
  const [location, setLocation] = useState({});
  const [regionFirstName, setRegionFirstName] = useState("");
  const [regionSecondName, setRegionSecondName] = useState("");
  const [shortWeather, setShortWeather] = useState([]);
  const { kakao } = window;
  const [commonValues, setCommonValues] = useState([]); // 공통 값을 저장할 상태
  const [commonValues2, setCommonValues2] = useState([]);

  const btnToggle = () => {
    setChecked(!checked);
  };

  const date = new Date();
  const hour = date.getHours();
  const weatherHour = Array.from({ length: 12 }, (_, i) => (hour + i) % 24); // 24시를 초과하면 0시로 초기화
  // console.log(weatherHour);
  // console.log(weatherHour[0] + "00");

  // 현재 위치의 위도, 경도 불러오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("현재 브라우저는 위치정보를 가져올 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coords = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      // 현재 좌표로 주소를 검색해서 필요한 값만 가져오기
      geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const region = result.find((item) => item.region_type === "H");
            if (region) {
              setRegionFirstName(region.region_1depth_name);
              setRegionSecondName(region.region_2depth_name);
            } else {
              setRegionFirstName(result[0].region_1depth_name);
              setRegionSecondName(result[0].region_2depth_name);
            }
          }
        }
      );
    }
  }, [location]);

  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기준점 Y좌표(GRID)

  function dfs_xy_conv(code, v1, v2) {
    var DEGRAD = Math.PI / 180.0;
    var RADDEG = 180.0 / Math.PI;

    var re = RE / GRID;
    var slat1 = SLAT1 * DEGRAD;
    var slat2 = SLAT2 * DEGRAD;
    var olon = OLON * DEGRAD;
    var olat = OLAT * DEGRAD;

    var sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    var rs = {};
    if (code === "toXY") {
      rs["lat"] = v1;
      rs["lng"] = v2;
      var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
      ra = (re * sf) / Math.pow(ra, sn);
      var theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
      rs["x"] = v1;
      rs["y"] = v2;
      var xn = v1 - XO;
      var yn = ro - v2 + YO;
      ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) ra = -ra;
      var alat = Math.pow((re * sf) / ra, 1.0 / sn);
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) theta = -theta;
        } else theta = Math.atan2(xn, yn);
      }
      var alon = theta / sn + olon;
      rs["lat"] = alat * RADDEG;
      rs["lng"] = alon * RADDEG;
    }
    return rs;
  }

  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      regionFirstName &&
      regionSecondName
    ) {
      let rs = dfs_xy_conv("toXY", location.latitude, location.longitude);
      const API_KEY =
        "GHL4EyAD%2B1JXd4bO0mbvcE28GOOhWZmfhkdcqWe63mC02FDwcKPaePr38d5RZyGhW8yO6AE4gcW5F2lyAJ06jA%3D%3D";
      const nx = rs.x;
      const ny = rs.y;
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (1 + date.getMonth())).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const today = year + month + day;
      const hours = Array.from(
        { length: 12 },
        (_, i) => ("0" + ((date.getHours() + i) % 24)).slice(-2) + "00"
      );

      const getShortWeather = async () => {
        const url = new URL(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=0200&nx=${nx}&ny=${ny}`
        );
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          // console.log("data--", data);

          if (data.response && data.response.body && data.response.body.items) {
            const shortWeather = data.response.body.items.item;
            const temp = data.response.body.items.item.filter(
              (item) => item.category === "TMP"
            );
            const sky = data.response.body.items.item.filter(
              (item) => item.category === "SKY"
            );
            // console.log(shortWeather);
            // console.log(sky);

            const commonValues = temp.filter((obj) =>
              hours.includes(obj.fcstTime)
            );
            setCommonValues(commonValues);
            const commonValues2 = sky.filter((obj) =>
              hours.includes(obj.fcstTime)
            );
            console.log(commonValues2);
            setCommonValues2(commonValues2);

            setShortWeather(shortWeather);
          } else {
            console.error("단기예보 API 응답 구조가 예상과 다릅니다.", data);
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      };

      getShortWeather();
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
          const value = commonValues.find(
            (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
          );
          const skyValue = commonValues2.find(
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
