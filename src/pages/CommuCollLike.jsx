import style from '../css/CommuCollLike.module.css';
import { useEffect, useState } from 'react';
import { useCategoryStore } from '../store/categoryStore';
import CommunityPost from '../components/CommunityPost';
import { url } from '../store/ref';

function CommuCollLike() {
  const { setOnMyPageCate } = useCategoryStore();
  useEffect(() => {
    setOnMyPageCate('like');
  }, []);

  const [likeData, setLikeData] = useState([]);
  const fetchLikeData = async () => {
    try {
      const response = await fetch(`${url}/mypage/likes`, {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setLikeData(data);
      }
    } catch (error) {
      console.error('좋아요한 글 get요청 오류', error);
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, []);

  return (
    <main className={`mw ${style.commuCollLike}`}>
      {likeData.length === 0 ? (
        <p className={style.loadingMsg}>좋아요한 글이 없습니다.</p>
      ) : (
        <ul className={style.likeListCon}>
          {likeData.map((post) => (
            <CommunityPost key={post._id} post={post} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default CommuCollLike;
