import style from "../css/CodiTalk.module.css";
import { useEffect, useState } from "react";
import useFetchStore from "../store/fetchStore";
import useClothesStore from "../store/clothesStore";
import useImageUrlStore from "../store/imageUrlStore";
import { url } from "../store/ref";

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

  const clothes = useClothesStore();
  const [chatData, setChatData] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [matchingWord, setMatchingWord] = useState({
    tops: [],
    bottoms: [],
    outers: [],
  });

  const setMatchingUrl = useImageUrlStore((state) => state.setMatchingUrl);

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
        uv !== ""
      ) {
        setDataLoaded(true);
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
  ]);

  useEffect(() => {
    const postClothesData = async () => {
      if (dataLoaded) {
        try {
          const response = await fetch(`${url}/codiTalkBox`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              temperature: temperature,
              maxTemp: maxTemp,
              minTemp: minTemp,
              rain: rain,
              dust: dust,
              uv: uv,
            }),
          });

          const data = await response.json();
          setChatData(data.response.content);
        } catch (error) {
          console.error("Failed to fetch:", error);
          setChatData("Failed to fetch data");
        }
      }
    };

    postClothesData();
  }, [dataLoaded, temperature, maxTemp, minTemp, rain, dust, uv]);

  useEffect(() => {
    if (chatData) {
      const findMatching = (obj, str) => {
        const keys = Object.keys(obj);
        const result = [];

        for (let key of keys) {
          if (str.includes(key)) {
            result.push(key);
          }
        }

        return result;
      };

      const topWords = findMatching(clothes.tops, chatData);
      const bottomWords = findMatching(clothes.bottoms, chatData);
      const outerWords = findMatching(clothes.outers, chatData);
      setMatchingWord({
        tops: topWords,
        bottoms: bottomWords,
        outers: outerWords,
      });
    }
  }, [chatData, clothes]);

  useEffect(() => {
    if (
      matchingWord.tops.length > 0 ||
      matchingWord.bottoms.length > 0 ||
      matchingWord.outers.length > 0
    ) {
      const topUrl = matchingWord.tops.map((word) => clothes.tops[word]);
      const bottomUrl = matchingWord.bottoms.map(
        (word) => clothes.bottoms[word]
      );
      const outerUrl = matchingWord.outers.map((word) => clothes.outers[word]);

      setMatchingUrl({
        tops: topUrl[0] || "",
        bottoms: bottomUrl[0] || "",
        outers: outerUrl[0] || "",
      });
      console.log(topUrl[0], bottomUrl[0], outerUrl[0]);
    }
  }, [matchingWord, clothes, setMatchingUrl]);

  return (
    <section className={style.talkBox}>
      <p className={`fontHead3 ${style.title}`}>오늘 뭐 입지?</p>
      {chatData ? (
        <p className={`fontDecorate ${style.talk}`}>{chatData}</p>
      ) : (
        <p className={`fontDecorate ${style.talk}`}>불러오는 중이에요~</p>
      )}
    </section>
  );
};

export default CodiTalk;
