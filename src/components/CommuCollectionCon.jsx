import style from '../css/CommuCollectionCon.module.css';

import { useEffect, useState } from 'react';

import CommunityPost from './CommunityPost';
import { url } from '../store/ref';

function CommuCollectionCon() {
  const [talkPostData, setTalkPostData] = useState([]);

  const fecthTalkData = async () => {
    try {
      const response = await fetch(`${url}/mypage/talk`, {
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setTalkPostData(data);
      }
    } catch (error) {
      console.error('작성글 get요청 오류', error);
    }
  };

  useEffect(() => {
    fecthTalkData();
  }, []);

  return (
    <>
      {talkPostData.length === 0 ? (
        <p className={style.loadingMsg}>작성글이 없습니다.</p>
      ) : (
        <ul className={style.talkListCon}>
          {talkPostData &&
            talkPostData.map((post) => (
              <CommunityPost key={post._id} post={post} />
            ))}
        </ul>
      )}
    </>
  );
}

export default CommuCollectionCon;
