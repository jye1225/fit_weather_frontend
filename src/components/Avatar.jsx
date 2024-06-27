// 말풍선 테스트 해보고 싶으시면, 주석처리 싹 다 해제하면 돼요!
import style from "../css/Avatar.module.css";
import { useEffect, useState } from "react";
import useFetchStore from "../store/fetchStore";

const Avatar = () => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    temperature,
    maxTemp,
    minTemp,
    rain,
    dust,
    uv,
  } = useFetchStore();

  // const [chatData, setChatData] = useState("");
  // const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (
  //       location.latitude &&
  //       location.longitude &&
  //       regionFirstName &&
  //       regionSecondName &&
  //       temperature !== "" &&
  //       maxTemp !== "" &&
  //       minTemp !== "" &&
  //       rain !== "" &&
  //       dust !== "" &&
  //       uv !== ""
  //     ) {
  //       setDataLoaded(true); // 모든 데이터가 준비된 경우에만 true로 설정
  //     }
  //   };

  //   fetchData();
  // }, [
  //   location,
  //   regionFirstName,
  //   regionSecondName,
  //   temperature,
  //   maxTemp,
  //   minTemp,
  //   rain,
  //   dust,
  //   uv,
  // ]);

  // useEffect(() => {
  //   const postWeatherData = async () => {
  //     if (dataLoaded) {
  //       try {
  //         const response = await fetch("http://localhost:8080/talkBox", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             temperature: temperature,
  //             maxTemp: maxTemp,
  //             minTemp: minTemp,
  //             rain: rain,
  //             dust: dust,
  //             uv: uv,
  //           }),
  //         });

  //         const data = await response.json();
  //         // console.log(data);
  //         setChatData(data.response.content);
  //       } catch (error) {
  //         console.error("Failed to fetch:", error);
  //         setChatData("Failed to fetch data");
  //       }
  //     }
  //   };

  //   postWeatherData();
  // }, [dataLoaded, temperature, maxTemp, minTemp, rain, dust, uv]);

  return (
    <section className={style.main}>
      <div className={style.talkBox}>
        <p className={`fontHead3 ${style.title}`}>오늘 날씨는?</p>
        {/* {chatData && <p className={`fontDecorate ${style.talk}`}>{chatData}</p>} */}
      </div>
      <div className={style.avatar}></div>
    </section>
  );
};

export default Avatar;
