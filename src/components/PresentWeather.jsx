import style from "../css/PresentWeather.module.css";
import { useEffect, useState } from "react";

const regionCodes = [
  { code: "1100000000", name: "서울특별시" },
  { code: "5100000000", name: "강원특별자치도" },
  { code: "4100000000", name: "경기도" },
  { code: "4800000000", name: "경상남도" },
  { code: "4700000000", name: "경상북도" },
  { code: "2900000000", name: "광주광역시" },
  { code: "2700000000", name: "대구광역시" },
  { code: "3000000000", name: "대전광역시" },
  { code: "2600000000", name: "부산광역시" },
  { code: "3600000000", name: "세종특별자치시" },
  { code: "3100000000", name: "울산광역시" },
  { code: "2800000000", name: "인천광역시" },
  { code: "4600000000", name: "전라남도" },
  { code: "5200000000", name: "전북특별자치도" },
  { code: "5000000000", name: "제주특별자치도" },
  { code: "4400000000", name: "충청남도" },
  { code: "4300000000", name: "충청북도" },
];

const PresentWeather = () => {
  const [location, setLocation] = useState({});
  const { kakao } = window;
  const [temperature, setTemperature] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [rain, setRain] = useState("");
  const [regionFirstName, setRegionFirstName] = useState("");
  const [regionSecondName, setRegionSecondName] = useState("");
  const [dust, setDust] = useState("");
  const [uv, setUv] = useState("");

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
            // result[0].region_2depth_name 값만 필요하므로, state에 저장
            const region = result.find((item) => item.region_type === "H");
            if (region) {
              setRegionFirstName(region.region_1depth_name);
              setRegionSecondName(region.region_2depth_name);
            } else {
              // "H" 타입이 없을 경우 첫 번째 결과를 사용
              setRegionFirstName(result[0].region_1depth_name);
              setRegionSecondName(result[0].region_2depth_name);
            }
          }
        }
      );
    }
  }, [location]);

  // 좌표를 기상청 격자정보로 변환하기
  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기1준점 Y좌표(GRID)

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
    if (code == "toXY") {
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

  // 위치 정보가 설정된 후에 API 호출을 해야 함으로, useEffect를 사용하여 비동기 처리
  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      regionFirstName &&
      regionSecondName
    ) {
      let rs = dfs_xy_conv("toXY", location.latitude, location.longitude);
      // console.log(rs.x, rs.y);

      // 날씨 api 불러오기
      const API_KEY =
        "GHL4EyAD%2B1JXd4bO0mbvcE28GOOhWZmfhkdcqWe63mC02FDwcKPaePr38d5RZyGhW8yO6AE4gcW5F2lyAJ06jA%3D%3D";
      const nx = rs.x;
      const ny = rs.y;
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (1 + date.getMonth())).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const today = year + month + day;
      const hours = ("0" + date.getHours()).slice(-2) + "00";

      // console.log(today);
      // console.log(hours);

      const getWeather = async () => {
        const url = new URL(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=${hours}&nx=${nx}&ny=${ny}`
        );

        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          // console.log("data--", data);

          // API 응답 구조가 올바른지 체크
          if (data.response && data.response.body && data.response.body.items) {
            const presentTemp = data.response.body.items.item;
            // console.log("presentTemp--", presentTemp);
            setTemperature(presentTemp[3].obsrValue.substr(0, 2));
          } else {
            console.error("초단기실황 API 응답 구조가 예상과 다릅니다.", data);
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      };

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
            // console.log("shortWeather--", shortWeather);
            setMaxTemp(shortWeather[157].fcstValue.substr(0, 2));
            setMinTemp(shortWeather[48].fcstValue.substr(0, 2));
            setRain(shortWeather[7].fcstValue);
          } else {
            console.error("단기예보 API 응답 구조가 예상과 다릅니다.", data);
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      };

      const getDust = async () => {
        const url = new URL(
          `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&stationName=${regionSecondName}&dataTerm=DAILY&ver=1.4`
        );
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          // console.log("data--", data.response.body.items[0]);
          if (
            data.response &&
            data.response.body &&
            data.response.body.items &&
            data.response.body.items[0]
          ) {
            let pm10 = data.response.body.items[0].pm10Grade1h;
            switch (pm10) {
              case "1":
                pm10 = "좋음";
                break;
              case "2":
                pm10 = "보통";
                break;
              case "3":
                pm10 = "나쁨";
                break;
              case "4":
                pm10 = "매우나쁨";
                break;
              default:
                pm10 = "-";
            }
            // console.log(pm10);
            setDust(pm10);
          } else {
            console.error("미세먼지 API 응답 구조가 예상과 다릅니다.", data);
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      };

      const getUv = async () => {
        const region = regionCodes.find((r) => r.name === regionFirstName);
        // console.log(region);
        const areaNo = region ? region.code : "1100000000"; // 기본값은 서울특별시로 설정
        // console.log(areaNo);

        const url = new URL(
          `https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?serviceKey=GHL4EyAD%2B1JXd4bO0mbvcE28GOOhWZmfhkdcqWe63mC02FDwcKPaePr38d5RZyGhW8yO6AE4gcW5F2lyAJ06jA%3D%3D&pageNo=1&numOfRows=10&dataType=JSON&areaNo=${areaNo}&time=${today}12`
        );
        try {
          const res = await fetch(url);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          // console.log("data--", data);

          if (data.response && data.response.body && data.response.body.items) {
            const maxUv = data.response.body.items.item[0].h0;

            const uvDegree =
              maxUv >= 0 && maxUv <= 2
                ? "낮음"
                : maxUv >= 3 && maxUv <= 5
                ? "보통"
                : maxUv >= 6 && maxUv <= 7
                ? "높음"
                : maxUv >= 8 && maxUv <= 10
                ? "매우높음"
                : maxUv >= 11
                ? "위험"
                : "유효하지 않은 값";

            // console.log("maxUv--", maxUv);
            // console.log("uvDegree--", uvDegree);
            setUv(uvDegree);
          } else {
            console.error("자외선 API 응답 구조가 예상과 다릅니다.", data);
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      };

      getWeather();
      getShortWeather();
      getDust();
      getUv();
    }
  }, [location, regionFirstName, regionSecondName]);

  return (
    <section className={`mw ${style.present}`}>
      <div className={style.temperature}>
        <p>{temperature}°C</p>
        <div className={style.minmax}>
          <span className="fontTitleS">최고</span>
          <span className="fontTitleXL">{maxTemp}°C</span>
          <br />
          <span className="fontTitleS">최저</span>
          <span className="fontTitleXL">{minTemp}°C</span>
        </div>
      </div>
      <div className={style.others}>
        <div className={style.con}>
          <span className="fontTitleS">강수확률</span>
          <p className="fontTitleXL">{rain}%</p>
        </div>
        <div className={style.con}>
          <span className="fontTitleS">미세먼지</span>
          <p className="fontTitleXL">{dust}</p>
        </div>
        <div className={style.con}>
          <span className="fontTitleS">자외선</span>
          <p className="fontTitleXL">{uv}</p>
        </div>
      </div>
    </section>
  );
};

export default PresentWeather;
