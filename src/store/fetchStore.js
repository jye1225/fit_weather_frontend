import { create } from "zustand";
import { dfs_xy_conv } from "../utils/coordinateConversion"; // 좌표 변환 함수 분리
import { regionCodes } from "../utils/regionCodes"; // 지역 코드 분리

const API_KEY =
  "GHL4EyAD%2B1JXd4bO0mbvcE28GOOhWZmfhkdcqWe63mC02FDwcKPaePr38d5RZyGhW8yO6AE4gcW5F2lyAJ06jA%3D%3D";

const useFetchStore = create((set, get) => ({
  location: {},
  temperature: "",
  maxTemp: "",
  minTemp: "",
  rain: "",
  dust: "",
  uv: "",
  regionFirstName: "",
  regionSecondName: "",

  setLocation: (location) => set({ location }),
  setWeatherData: (data) => set(data),
  setRegionFirstName: (name) => set({ regionFirstName: name }),
  setRegionSecondName: (name) => set({ regionSecondName: name }),

  fetchLocation: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        set({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      });
    } else {
      console.log("현재 브라우저는 위치정보를 가져올 수 없습니다.");
    }
  },

  fetchWeatherData: async () => {
    const { location, regionFirstName, regionSecondName } = get();

    if (
      !location.latitude ||
      !location.longitude ||
      !regionFirstName ||
      !regionSecondName
    ) {
      console.warn("Location or region information is missing.");
      return;
    }

    const { x, y } = dfs_xy_conv("toXY", location.latitude, location.longitude);
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const today = year + month + day;
    const hours = ("0" + date.getHours()).slice(-2) + "00";

    const fetchWeather = async () => {
      try {
        const url = new URL(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=${hours}&nx=${x}&ny=${y}`
        );
        const res = await fetch(url);
        const data = await res.json();
        if (data.response?.body?.items?.item) {
          const presentTemp = data.response.body.items.item;
          return { temperature: presentTemp[3].obsrValue.substr(0, 2) };
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
      return { temperature: "" };
    };

    const fetchShortWeather = async () => {
      try {
        const url = new URL(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=0200&nx=${x}&ny=${y}`
        );
        const res = await fetch(url);
        const data = await res.json();
        if (data.response?.body?.items?.item) {
          const shortWeather = data.response.body.items.item;
          return {
            maxTemp: shortWeather[157].fcstValue.substr(0, 2),
            minTemp: shortWeather[48].fcstValue.substr(0, 2),
            rain: shortWeather[7].fcstValue,
          };
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching short weather data:", error);
      }
      return { maxTemp: "", minTemp: "", rain: "" };
    };

    const fetchDust = async () => {
      try {
        const url = new URL(
          `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&stationName=${regionSecondName}&dataTerm=DAILY&ver=1.4`
        );
        const res = await fetch(url);
        const data = await res.json();
        if (data.response?.body?.items && data.response.body.items.length > 0) {
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
          return { dust: pm10 };
        } else {
          console.error(
            "Unexpected response structure or empty items array:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching dust data:", error);
      }
      return { dust: "" };
    };

    const fetchUv = async () => {
      try {
        const region = regionCodes.find((r) => r.name === regionFirstName);
        const areaNo = region ? region.code : "1100000000";
        const url = new URL(
          `https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&dataType=JSON&areaNo=${areaNo}&time=${today}12`
        );
        const res = await fetch(url);
        const data = await res.json();
        if (data.response?.body?.items?.item) {
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
          return { uv: uvDegree };
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching UV data:", error);
      }
      return { uv: "" };
    };

    try {
      const [weather, shortWeather, dust, uv] = await Promise.all([
        fetchWeather(),
        fetchShortWeather(),
        fetchDust(),
        fetchUv(),
      ]);

      set({
        ...weather,
        ...shortWeather,
        ...dust,
        ...uv,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  },
}));

export default useFetchStore;
