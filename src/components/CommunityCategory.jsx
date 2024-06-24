import style from '../css/CommunityCategory.module.css';

import { Link, Outlet } from 'react-router-dom';

function CommunityCategory() {
  const toggleOn = (e) => {
    const links = document.querySelectorAll(`.${style.buttonCon} a`);
    links.forEach((link) => link.classList.remove(style.on));
    e.currentTarget.classList.add(style.on);
  };

  return (
    <div className={`mw ${style.communityCategory}`}>
      <div className={style.communityHd}>
        <span className="fontHead2">커뮤니티</span>
        <div className={style.buttonCon}>
          <Link
            to="/community"
            className={`fontBodyM ${style.on}`}
            onClick={toggleOn}
          >
            날씨패션 톡
          </Link>
          <Link to="/community/feed" className={`fontBodyM`} onClick={toggleOn}>
            패션 인스타
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default CommunityCategory;
