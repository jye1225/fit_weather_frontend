import style from '../css/TalkPage.module.css';

import CommunityFilter from '../components/CommunityFilter';
import CommunityPostCon from '../components/CommunityPostCon';
import { useEffect } from 'react';
import { url } from '../store/ref';

function TalkPage() {
  // useEffect(() => {
  //   fetch(`${url}/postsList`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  const goPostWrite = () => {
    window.location = '/postWrite';
  };

  return (
    <main className={`mw ${style.talkPage}`}>
      <CommunityFilter />
      <CommunityPostCon />
      <button className={style.writeBtn} onClick={goPostWrite}>
        글쓰기
      </button>
    </main>
  );
}

export default TalkPage;
