import { useEffect } from 'react';
import style from '../css/CommuCollectionCon.module.css';
import CommunityPost from './CommunityPost';
import { useLoginInfoStore } from '../store/loginInfoStore';
import { url } from '../store/ref';

function CommuCollectionCon() {
  const { userInfo } = useLoginInfoStore();
  // const userId = userInfo.userid;

  // const fecthTalkData = async () => {
  //   const response = await fetch(`${url}/mypage/talk?userId=${userId}`);
  //   const data = await response.json();
  //   console.log(data);
  // };

  useEffect(() => {
    console.log(userInfo);
    // fecthTalkData();
  }, []);

  return (
    <ul className={style.talkListCon}>
      <li>리스트1</li>
      {/* <CommunityPost />
      <CommunityPost /> */}
    </ul>
  );
}

export default CommuCollectionCon;
