import style from '../css/TalkPage.module.css';

import CommunityFilter from '../components/CommunityFilter';
import CommunityPostCon from '../components/CommunityPostCon';

import { buttonStore } from '../store/talkbuttonStore';
import { useEffect } from 'react';

function TalkPage() {
  const { setOnBtn } = buttonStore();
  const goPostWrite = () => {
    window.location = '/postWrite';
  };

  useEffect(() => {
    setOnBtn('all');
  }, []);

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
