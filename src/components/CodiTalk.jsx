import style from "../css/CodiTalk.module.css";
import { useEffect } from "react";
import useMatchingData from "../hooks/matchingData";

const CodiTalk = ({ setMatchingUrl }) => {
  const { matchingWord, chatData, clothes } = useMatchingData();

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
