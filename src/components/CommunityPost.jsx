import style from '../css/CommunityPost.module.css';
import CommunityCategory from './CommunitySubCategory';

import { useNavigate } from 'react-router-dom';

function CommunityPost() {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/:postId`);
  };

  return (
    <li className={style.comuList} onClick={goDetail}>
      <CommunityCategory />
      <strong className="fontTitleS">제목이 들어갑니다</strong>
      <div className={`fontTitleXS ${style.postInfo}`}>
        <span>아이디</span>
        <span>2024년 06월 16일</span>
        <div className={style.commentIcon}>
          <i className="fa-regular fa-comment"></i>
          <span>2</span>
        </div>
        <div className={style.likeIcon}>
          <i className="fa-regular fa-heart"></i>
          <span>3</span>
        </div>
      </div>
      <div className={style.postImg}>
        <img src="/img/img1.jpg" alt="이미지" />
      </div>
    </li>
  );
}

export default CommunityPost;
