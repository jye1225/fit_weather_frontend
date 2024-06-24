import style from '../css/CoordiReviewOption.module.css';

function CoordiReviewOption() {
  return (
    <fieldset
      htmlFor="coordiReviewOption"
      className={`${style.coordiReviewOption} ${style.on}`}
    >
      <legend>코디평가 받으실래요?</legend>
      <p className="fontTitleM">코디평가 받으실래요?</p>
      <div className={style.onOffSelcet}>
        <label htmlFor="coordiOn" className={style.customRadio}>
          <input type="radio" id="coordiOn" name="coordiReview" />
          <span className={style.checkmark}></span>
          <span className="fontTitleM"> 예</span>
        </label>
        <label htmlFor="coordiOff" className={style.customRadio}>
          <input
            type="radio"
            id="coordiOff"
            name="coordiReview"
            defaultChecked={true}
          />
          <span className={style.checkmark}></span>
          <span className="fontTitleM"> 아니요</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CoordiReviewOption;
