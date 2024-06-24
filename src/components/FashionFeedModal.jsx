import style from '../css/FashionFeedModal.module.css';
function FashionFeedModal() {
  return (
    <div className={`${style.fshfeedModal} ${style.on}`}>
      <div className={style.fshModalContent}>
        <a href="#">
          <span className="fontHead3">@계정</span>
        </a>
        <div className={style.feedLarge}>피드</div>
        <i>X</i>
      </div>
    </div>
  );
}

export default FashionFeedModal;
