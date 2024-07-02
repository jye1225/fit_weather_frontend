import { useState, useEffect } from "react";
import style from "../css/Avatar.module.css";

const Avatar = ({ topUrl, bottomUrl, outerUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Avatar URLs:", { topUrl, bottomUrl, outerUrl });
    if (topUrl || bottomUrl || outerUrl) {
      setIsLoading(false);
    }
  }, [topUrl, bottomUrl, outerUrl]);

  return (
    <section className={style.avatar}>
      {isLoading ? (
        <div className={`fontTitleM ${style.loadingText}`}>
          불러오는 중이에요~
        </div>
      ) : (
        <>
          <img
            className={style.person}
            src="img/clothes/woman.svg"
            alt="여자"
          />
          {topUrl && <img className={style.top} src={topUrl} alt="상의" />}
          {bottomUrl && (
            <img className={style.bottom} src={bottomUrl} alt="하의" />
          )}
          {outerUrl && (
            <img className={style.outer} src={outerUrl} alt="아우터" />
          )}
        </>
      )}
    </section>
  );
};

export default Avatar;
