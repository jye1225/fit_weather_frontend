import style from "../css/CodiTalk.module.css";
import { useEffect, useState } from "react";
import useFetchStore from "../store/fetchStore";
import useClothesStore from "../store/clothesStore";

const CodiTalk = () => {
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

  const { tops, bottoms, outerwear, others } = useClothesStore();
  const [chatData, setChatData] = useState("");
  const [matchingClothes, setMatchingClothes] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        location.latitude &&
        location.longitude &&
        regionFirstName &&
        regionSecondName &&
        temperature !== "" &&
        maxTemp !== "" &&
        minTemp !== "" &&
        rain !== "" &&
        dust !== "" &&
        uv !== "" &&
        tops &&
        bottoms &&
        outerwear &&
        others
      ) {
        setDataLoaded(true); // 모든 데이터가 준비된 경우에만 true로 설정
      }
    };

    fetchData();
  }, [
    location,
    regionFirstName,
    regionSecondName,
    temperature,
    maxTemp,
    minTemp,
    rain,
    dust,
    uv,
    tops,
    bottoms,
    outerwear,
    others,
  ]);

  // useEffect(() => {
  //   const postClothesData = async () => {
  //     if (dataLoaded) {
  //       try {
  //         const response = await fetch("http://localhost:8080/codiTalkBox", {
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
  //             tops: tops,
  //             bottoms: bottoms,
  //             outerwear: outerwear,
  //             others: others,
  //           }),
  //         });

  //         const data = await response.json();
  //         setChatData(data.response.content);
  //       } catch (error) {
  //         console.error("Failed to fetch:", error);
  //         setChatData("Failed to fetch data");
  //       }
  //     }
  //   };

  //   postClothesData();
  // }, [
  //   dataLoaded,
  //   temperature,
  //   maxTemp,
  //   minTemp,
  //   rain,
  //   dust,
  //   uv,
  //   tops,
  //   bottoms,
  //   outerwear,
  //   others,
  // ]);

  // useEffect(() => {
  //   if (chatData) {
  //     // 1. chatData를 단어 단위로 분리
  //     const words = chatData
  //       .split(/[\s,!.?]+/)
  //       .map((word) => word.replace(/[^가-힣a-zA-Z]/g, ""));

  //     // 2. clothesStore.js의 배열 값을 하나의 배열로 합침
  //     const allClothes = [...tops, ...bottoms, ...outerwear, ...others];

  //     // 3. 분리된 단어와 clothesStore.js의 배열 값 비교
  //     const matches = words.filter((word) => allClothes.includes(word));
  //     setMatchingClothes(matches);
  //     console.log(words);
  //     console.log(matches);
  //   }
  // }, [chatData, tops, bottoms, outerwear, others]);

  return (
    <section className={style.talkBox}>
      <p className={`fontHead3 ${style.title}`}>오늘 뭐 입지?</p>
      {chatData && <p className={`fontDecorate ${style.talk}`}>{chatData}</p>}
    </section>
  );
};

export default CodiTalk;
