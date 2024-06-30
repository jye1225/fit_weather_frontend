import style from "../css/Avatar.module.css";

const Avatar = () => {
  return (
    <section className={style.avatar}>
      <img className={style.person} src="img/clothes/woman.svg" alt="사람" />
      <img
        className={style.top}
        src="img/clothes/short_sleeve_T.svg"
        alt="상의"
      />
      <img
        className={style.bottom}
        src="img/clothes/long_skirt.svg"
        alt="하의"
      />
      <img
        className={style.outer}
        src="img/clothes/cardigan.svg"
        alt="아우터"
      />
    </section>
  );
};

export default Avatar;
