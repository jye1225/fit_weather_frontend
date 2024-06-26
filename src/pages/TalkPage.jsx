import style from '../css/TalkPage.module.css';

import CommunityFilter from '../components/CommunityFilter';
import CommunityPostCon from '../components/CommunityPostCon';
import { useEffect } from 'react';
import { url } from '../store/ref';

function TalkPage() {
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
