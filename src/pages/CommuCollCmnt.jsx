import style from '../css/CommuCollCmnt.module.css';
import { useEffect, useState } from 'react';
import { useCategoryStore } from '../store/categoryStore';
import { url } from '../store/ref';
import DetailComment from '../components/DetailComment';

function CommuCollCmnt() {
  const { setOnMyPageCate } = useCategoryStore();
  useEffect(() => {
    setOnMyPageCate('comment');
  }, []);

  const [commentData, setCommentData] = useState([]);

  const fetchCmntData = async () => {
    try {
      const response = await fetch(`${url}/mypage/comments`, {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setCommentData(data);
      }
    } catch (error) {
      console.error('작성댓글 get요청 오류', error);
    }
  };

  useEffect(() => {
    fetchCmntData();
  }, []);

  return (
    <main className={`mw ${style.commuCollCmnt}`}>
      {commentData.length === 0 ? (
        <p className={style.loadingMsg}>댓글을 불러오는 중입니다...</p>
      ) : (
        <ul className={style.cmntListCon}>
          {commentData.map((cmnt) => (
            <DetailComment key={cmnt._id} cmnt={cmnt} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default CommuCollCmnt;
