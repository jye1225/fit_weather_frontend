import { useNavigate, useParams } from 'react-router-dom';
import style from '../css/PostWriteCmpltPage.module.css';
import { usePostData } from '../store/postDataStore';
import { useEffect } from 'react';

function PostWriteCmpltPage() {
  const navigate = useNavigate();
  const { newPostId, clearNewPostId } = usePostData();

  const goDetail = () => {
    navigate(`/detail/${newPostId}`);
    clearNewPostId();
  };

  const goPostList = () => {
    navigate('/community');
  };

  return (
    <main className="mw">
      <div className={style.cmpltMessage}>
        <img src="/img/icons/common/checkCircle.svg" alt="완료" />
        <p className="fontTitleL">글쓰기가 완료되었습니다.</p>
      </div>
      <div className={style.btnCon}>
        <button className="fontTitleM" onClick={goPostList}>
          목록으로
        </button>
        <button className="fontTitleM" onClick={goDetail}>
          작성한 글 보기
        </button>
      </div>
    </main>
  );
}

export default PostWriteCmpltPage;
