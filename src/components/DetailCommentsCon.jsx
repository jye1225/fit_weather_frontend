import style from '../css/DetailCommentsCon.module.css';
import DetailComment from './DetailComment';

function DetailCommentsCon() {
  return (
    <div className={style.commentsCon}>
      <div className={style.commentCount}>
        <span>댓글 </span>
        <span>5</span>
      </div>
      <div className={style.commentWrite}>
        <textarea placeholder="댓글을 입력하세요." maxLength="300" />
        <button>등록</button>
      </div>
      <ul className={style.commentsList}>
        <DetailComment />
        <DetailComment />
        <DetailComment />
      </ul>
    </div>
  );
}

export default DetailCommentsCon;
