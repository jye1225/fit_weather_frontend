import { useState } from 'react';
import style from '../css/PostCategorySelect.module.css';
import CoordiReviewOption from './CoordiReviewOption';

function PostCategorySelect() {
  const [showCoordiReview, setShowCoordiReview] = useState(false);

  const selectTodayCoordi = (e) => {
    // console.log('오늘코디', e.target);
    if (e.target.id === 'todayCoordi') {
      setShowCoordiReview(true);
    } else {
      setShowCoordiReview(false);
    }
  };

  return (
    <fieldset className={style.postCategorySelect}>
      <legend>카테고리</legend>
      <span className="fontHead3 ">카테고리</span>
      <div className={style.categoryCon}>
        <label
          htmlFor="todayWeather"
          className={`${style.customRadio} ${style.weatherCateSelect}`}
        >
          <input
            type="radio"
            id="todayWeather"
            name="PostCateSelect"
            onChange={selectTodayCoordi}
          />

          <span className="fontBodyM">오늘날씨</span>
        </label>

        <label
          htmlFor="todayCoordi"
          className={`${style.customRadio} ${style.coordiCateSelect}`}
        >
          <input
            type="radio"
            id="todayCoordi"
            name="PostCateSelect"
            onChange={selectTodayCoordi}
          />
          <span className="fontBodyM">오늘코디</span>
        </label>
      </div>
      {showCoordiReview && <CoordiReviewOption />}
    </fieldset>
  );
}

export default PostCategorySelect;
