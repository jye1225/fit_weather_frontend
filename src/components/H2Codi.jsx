import style from "../css/H2.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const H2Codi = ({ setSelectDate }) => {
  const getDate = (addDay) => {
    const date = new Date();
    date.setDate(date.getDate() + addDay);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const dateClick = (addDay) => {
    const date = addDay === 0 ? "오늘" : getDate(addDay);
    setSelectDate(date);
  };

  return (
    <section className={style.header2Main}>
      <div className={style.h2Con}>
        <h2 className="fontHead2">코디</h2>
        <div className={style.btnCon}>
          <button
            className={`fontBodyM ${style.btnDate} ${style.active}`}
            onClick={() => dateClick(0)}
          >
            오늘
          </button>
          <button
            className={`fontBodyM ${style.btnDate}`}
            onClick={() => dateClick(1)}
          >
            {getDate(1)}
          </button>
          <button
            className={`fontBodyM ${style.btnDate}`}
            onClick={() => dateClick(2)}
          >
            {getDate(2)}
          </button>
          <button
            className={`fontBodyM ${style.btnDate}`}
            onClick={() => dateClick(3)}
          >
            {getDate(3)}
          </button>
        </div>
      </div>
    </section>
  );
};

export default H2Codi;
