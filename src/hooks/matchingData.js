import { useEffect, useState } from "react";
import useFetchStore from "../store/fetchStore";
import useClothesStore from "../store/clothesStore";
import { url } from "../store/ref";

const useMatchingData = () => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    temperature,
    maxTemp,
    minTemp,
    popValue,
    dust,
    uv,
  } = useFetchStore();

  const clothes = useClothesStore();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chatData, setChatData] = useState("");
  const [matchingWord, setMatchingWord] = useState({
    tops: [],
    bottoms: [],
    outers: [],
  });

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
        popValue !== "" &&
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
    popValue,
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
              popValue: popValue,
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
  }, [dataLoaded, temperature, maxTemp, minTemp, popValue, dust, uv]);

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

  return {
    location,
    regionFirstName,
    regionSecondName,
    temperature,
    maxTemp,
    minTemp,
    popValue,
    dust,
    uv,
    dataLoaded,
    matchingWord,
    chatData,
    setMatchingWord,
    setChatData,
    clothes,
  };
};

export default useMatchingData;
