import { useState } from 'react';
import style from '../css/DetailCommentsCon.module.css';
import DetailComment from './DetailComment';

function DetailCommentsCon() {
  const [comment, setComment] = useState();

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const commentSubmit = () => {
    //댓글 등록버튼 클릭시
    //DB에 저장하는 로직 추가
  };

  return (
    <div className={style.commentsCon}>
      <div className={style.commentCount}>
        <span>댓글 </span>
        <span>5</span>
      </div>
      <div className={style.commentWrite}>
        <textarea
          placeholder="댓글을 입력하세요."
          maxLength="300"
          value={comment}
          onChange={getComment}
        />
        <button onClick={commentSubmit}>등록</button>
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
