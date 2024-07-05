import { useState, useEffect } from "react";
import style from "../css/CodiTalk.module.css";
import useMatchingData from "../hooks/matchingData";

const CodiTalk = ({ setMatchingUrl }) => {
  const [selectedTemp, setSelectedTemp] = useState("적당");
  const [selectedMode, setSelectedMode] = useState("기본");
  const { matchingWord, chatData, clothes } = useMatchingData(
    selectedTemp,
    selectedMode
  ); // useMatchingData에서 {}값을 가져오고, ()값을 보냄

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

      const newMatchingUrl = {
        tops: topUrl[0] || "",
        bottoms: bottomUrl[0] || "",
        outers: outerUrl[0] || "",
      };
      setMatchingUrl(newMatchingUrl);
      // console.log(topUrl[0], bottomUrl[0], outerUrl[0]);
    }
  }, [matchingWord, clothes, setMatchingUrl]);

  const tempClick = (temp) => {
    setSelectedTemp(temp);
  };

  const modeClick = (mode) => {
    setSelectedMode(mode);
  };
  // console.log(selectedTemp);
  // console.log(selectedMode);

  return (
    <section className={style.talkBox}>
      <div className={style.filter}>
        <p className={`fontHead3 ${style.title}`}>오늘 뭐 입지?</p>
        <div className={`fontBodyS ${style.temp}`}>
          {["시원", "적당", "따뜻"].map((temp) => (
            <span
              key={temp}
              onClick={() => tempClick(temp)}
              className={selectedTemp === temp ? style.selected : ""}
            >
              {temp}
            </span>
          ))}
        </div>
        <div className={`fontBodyS ${style.mode}`}>
          {["기본", "취향"].map((mode) => (
            <span
              key={mode}
              onClick={() => modeClick(mode)}
              className={selectedMode === mode ? style.selected : ""}
            >
              {mode}
            </span>
          ))}
        </div>
      </div>
      {chatData ? (
        <p className={`fontDecorate ${style.talk}`}>{chatData}</p>
      ) : (
        <p className={`fontDecorate ${style.talk}`}>불러오는 중이에요~</p>
      )}
    </section>
  );
};

export default CodiTalk;
