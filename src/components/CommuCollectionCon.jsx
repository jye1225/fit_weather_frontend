import style from '../css/CommuCollectionCon.module.css';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import CommunityPost from './CommunityPost';
import { useLoginInfoStore } from '../store/loginInfoStore';
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
        <p className={style.loadingMsg}>리스트를 불러오는 중입니다...</p>
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
