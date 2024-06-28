import { useEffect, useState } from 'react';
import style from '../css/DetailCommentsCon.module.css';
import DetailComment from './DetailComment';
import { usePostData } from '../store/postDataStore';
import { useParams } from 'react-router-dom';
import { url } from '../store/ref';

function DetailCommentsCon() {
  const { postDetail } = usePostData();
  const [comment, setComment] = useState();
  const { postId } = useParams();

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const commentSubmit = () => {
    //댓글 등록버튼 클릭시
    //DB에 저장하는 로직 추가
  };

  useEffect(() => {
    fetch(`${url}/posts/postCmnt/${postId}`) //
      .then((res) => res.json()) //
      .then((data) => {
        // setPostDetail(data);
        // setLikes(data.likeCount);
        // setOriginImgPath(data.image);
      });
    console.log(postDetail);
  }, [postId]);

  return (
    <div className={style.commentsCon}>
      <div className={style.commentCount}>
        <span className="fontHead3">댓글 </span>
        <span className="fontHead3">{postDetail.commentsCount}</span>
      </div>
      <div className={style.commentWrite}>
        <textarea
          className="fontBodyM"
          placeholder="댓글을 입력하세요."
          maxLength="300"
          value={comment}
          onChange={getComment}
        />
        <button className="fontTitleM" onClick={commentSubmit}>
          등록
        </button>
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
