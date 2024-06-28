import style from '../css/CommunityCategory.module.css';

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { buttonStore } from '../store/talkbuttonStore';

function CommunityCategory() {
  const [onCate, setOnCate] = useState('talk');
  const { setOnBtn } = buttonStore();
  const talkOn = () => {
    setOnCate('talk');
  };
  const feedOn = () => {
    setOnBtn('all');
    setOnCate('feed');
  };

  return (
    <div className={`mw ${style.communityCategory}`}>
      <div className={style.communityHd}>
        <span className="fontHead2">커뮤니티</span>
        <div className={style.buttonCon}>
          <Link
            to="/community"
            className={`fontBodyM ${onCate === 'talk' ? style.on : ''}`}
            onClick={talkOn}
          >
            날씨패션 톡
          </Link>
          <Link
            to="/community/feed"
            className={`fontBodyM ${onCate === 'feed' ? style.on : ''}`}
            onClick={feedOn}
          >
            패션 인스타
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default CommunityCategory;
